// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title CallOption
 * @dev Represents an American-style Call Option on the EVM Gas Price.
 */
contract CallOption { // TODO: change block timestamp to block.number
    // Option parameters
    uint256 public strike;        // Strike price (in wei)
    uint256 public expiration;    // Expiration timestamp
    address public factory;       // Address of the factory that created this option

    // Collateralization factor (3x)
    uint256 constant COLLATERAL_FACTOR = 3;

    // Structs for positions
    struct Position {
        address buyer;
        address seller;
        uint256 size;           // Number of options (gas units)
        uint256 collateral;     // Collateral deposited (in wei)
    }

    // Order book structs
    struct Bid {
        address bidder;
        uint256 amount;         // Number of options (gas units)
        uint256 price;          // Price per option (in wei)
    }

    struct Offer {
        address seller;
        uint256 amount;         // Number of options (gas units)
        uint256 price;          // Price per option (in wei)
        uint256 collateral;     // Collateral deposited (in wei)
    }

    // Arrays to keep track of positions
    Position[] public positions;

    // Order books
    Bid[] public bids;
    Offer[] public offers;

    // Events
    event ShortPositionCreated(address indexed writer, uint256 size, uint256 collateral);
    event LongPositionCreated(address indexed buyer, uint256 size, uint256 price);
    event BidPlaced(address indexed bidder, uint256 amount, uint256 price);
    event OfferPlaced(address indexed seller, uint256 amount, uint256 price);
    event OptionExercised(address indexed holder, uint256 amount, uint256 gasPrice);
    event OptionSettled(uint256 finalGasPrice);
    event PositionLiquidated(address indexed liquidator, address indexed positionOwner, uint256 amount);
    event CollateralWithdrawn(address indexed writer, uint256 amount);
    event OfferDeleted(address indexed seller, uint256 indexed offerIndex);
    event BidDeleted(address indexed bidder, uint256 indexed bidIndex);

    /**
     * @dev Modifier to check if the option is not expired.
     */
    modifier notExpired() {
        require(block.timestamp < expiration, "Option has expired");
        _;
    }

    /**
     * @dev Modifier to check if the option is expired.
     */
    modifier isExpired() {
        require(block.timestamp >= expiration, "Option has not expired yet");
        _;
    }

    /**
     * @dev Constructor to initialize the CallOption contract.
     * @param _strike The strike price in wei.
     * @param _expiration The expiration timestamp.
     * @param _factory The address of the factory contract.
     */
    constructor(uint256 _strike, uint256 _expiration, address _factory) {
        require(_expiration > block.timestamp, "Expiration must be in the future");
        strike = _strike;
        expiration = _expiration;
        factory = _factory;
    }

    function placeBid(uint256 _amount, uint256 _price) external payable notExpired {
        require(_amount > 0, "Amount must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        require(msg.value == _amount * _price, "Incorrect ETH amount sent");

        Bid memory bid = Bid({
            bidder: msg.sender,
            amount: _amount,
            price: _price
        });

        // Try to settle the bid against existing offers first
        _settleBid(bid);

        // If there's any remaining amount, add it to the bid book, sorted by price
        if (bid.amount > 0) {
            _insertSortBid(bid);
            emit BidPlaced(msg.sender, bid.amount, bid.price);
        }
    }

    function _insertSortBid(Bid memory _bid) internal {
        // TODO: implement
    }

    function _settleBid(Bid memory _bid) internal {
        // TODO: implement
    }

    function deleteBid(uint256 _bidIndex) external {
        // TODO: implement
    }

    /**
     * @dev Places an offer in the order book.
     * @param _size The number of options to sell.
     * @param _price The offer price per option in wei.
     */
    function placeOffer(uint256 _size, uint256 _price) external payable notExpired {
        require(_size > 0, "Amount must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        require(msg.value == COLLATERAL_FACTOR * _size * _price, "Insufficient collateral");

        Offer memory offer = Offer({
            seller: msg.sender,
            amount: _size,
            price: _price,
            collateral: msg.value
        });
        _checkSettleOffer(offer);
        _insertSortOffer(offer);
    }

    /**
     * @dev Checks if the offer can be settled with the bids and settles if so.
     * @param _offer The offer to check and settle.
     */
    function _checkSettleOffer(Offer memory _offer) internal {
        // Iterate through bids from highest to lowest price
        for (uint256 i = 0; i < bids.length && _offer.amount > 0; i++) {
            // Skip if bid price is lower than offer price
            if (bids[i].price < _offer.price) continue;

            // Calculate the amount to settle
            uint256 settleAmount = _offer.amount < bids[i].amount ? 
                _offer.amount : bids[i].amount;

            // Create new position
            Position memory newPosition = Position({
                buyer: bids[i].bidder,
                seller: _offer.seller,
                size: settleAmount,
                collateral: (_offer.collateral * settleAmount) / _offer.amount
            });
            positions.push(newPosition);

            // Transfer payment from bid to seller
            payable(_offer.seller).transfer(settleAmount * bids[i].price); // TODO: adapt to work on NIL blockchain

            // Update remaining amounts
            _offer.amount -= settleAmount;
            _offer.collateral = (_offer.collateral * _offer.amount) / (_offer.amount + settleAmount);
            bids[i].amount -= settleAmount;

            // Remove bid if fully filled
            if (bids[i].amount == 0) {
                if (i != bids.length - 1) {
                    bids[i] = bids[bids.length - 1];
                }
                bids.pop();
                i--; // Adjust index since we removed an element
            }

            emit LongPositionCreated(newPosition.buyer, settleAmount, bids[i].price);
            emit ShortPositionCreated(newPosition.seller, settleAmount, newPosition.collateral);
        }
    }

    /**
     * @dev Deletes an offer from the order book.
     * @param _offerIndex The index of the offer to delete.
     */
    function deleteOffer(uint256 _offerIndex) external {
        require(_offerIndex < offers.length, "Invalid offer index");
        require(offers[_offerIndex].seller == msg.sender, "Not the offer owner");

        // If this is not the last element, move the last offer to this position
        if (_offerIndex != offers.length - 1) {
            offers[_offerIndex] = offers[offers.length - 1];
        }
        
        emit OfferDeleted(msg.sender, _offerIndex);
        offers.pop();
    }

    /**
     * @dev Allows a long holder to exercise their option at any time before expiration.
     */
    function exercise(uint256 _amount) external notExpired {
        require(_amount > 0, "Amount must be greater than zero");

        // Find the long position
        uint256 totalAvailable = 0;
        uint256 positionIndex = type(uint256).max;
        for (uint256 i = 0; i < longPositions.length; i++) {
            if (longPositions[i].owner == msg.sender) {
                totalAvailable += longPositions[i].size;
                positionIndex = i;
                break;
            }
        }
        require(positionIndex != type(uint256).max, "Long position not found");
        require(totalAvailable >= _amount, "Not enough options to exercise");

        // Calculate the cost based on current gas price
        uint256 currentGasPrice = block.basefee;
        require(currentGasPrice >= strike, "Gas price below strike, option not profitable");

        uint256 payout = _amount * (currentGasPrice - strike);

        // Transfer ETH to the option holder
        payable(msg.sender).transfer(payout);

        // Reduce the long position
        longPositions[positionIndex].size -= _amount;

        emit OptionExercised(msg.sender, _amount, currentGasPrice);
    }

    /**
     * @dev Settles the option at expiration using block.basefee.
     */
    function _settle() external isExpired {
        uint256 finalGasPrice = block.basefee;
        emit OptionSettled(finalGasPrice);
        // Additional settlement logic can be added here
    }

    /**
     * @dev Inserts an offer into the order book using insertion sort.
     * @param _offer The offer to insert.
     */
    function _insertSortOffer(Offer memory _offer) internal {
        if (_offer.amount == 0) return;

        // If offers array is empty, simply push the new offer
        if (offers.length == 0) {
            offers.push(_offer);
            return;
        }

        // Find the correct position to insert (ascending order by price)
        uint256 i;
        for (i = 0; i < offers.length; i++) {
            if (_offer.price < offers[i].price) {
                break;
            }
        }

        // Push a dummy offer to increase array length
        offers.push(offers[offers.length - 1]);

        // Shift all higher priced offers up by one position
        for (uint256 j = offers.length - 1; j > i; j--) {
            offers[j] = offers[j - 1];
        }

        // Insert the new offer at the correct position
        offers[i] = _offer;

        emit OfferPlaced(msg.sender, _offer.amount, _offer.price);
    }

    /**
     * @dev Liquidates an undercollateralized short position.
     * @param _positionIndex The index of the short position to liquidate.
     */
    function _liquidate(uint256 _positionIndex) external payable notExpired {
        require(_positionIndex < shortPositions.length, "Invalid position index");
        ShortPosition storage position = shortPositions[_positionIndex];

        // Check collateralization
        uint256 requiredCollateral = position.size * strike * COLLATERAL_FACTOR;
        if (position.collateral < requiredCollateral) {
            // Calculate the deficit
            uint256 deficit = requiredCollateral - position.collateral;
            require(msg.value >= deficit, "Insufficient ETH to cover deficit");

            // Transfer the deficit to the original position owner
//!!!Forge test cannot make the short owner payable - fix this!!!
//            payable(position.owner).transfer(deficit);

            // Update the collateral
            position.collateral += msg.value;

            emit PositionLiquidated(msg.sender, position.owner, position.size);
        } else {
            revert("Position is sufficiently collateralized");
        }
    }

    /**
     * @dev Allows writers to withdraw their collateral after expiration.
     * @param _positionIndex The index of the short position to withdraw collateral from.
     */
    function _withdrawCollateral(uint256 _positionIndex) external isExpired {
        require(_positionIndex < shortPositions.length, "Invalid position index");
        ShortPosition storage position = shortPositions[_positionIndex];
        require(position.owner == msg.sender, "Not the owner of this position");

        uint256 collateralAmount = position.collateral;
        position.collateral = 0;

        // Transfer collateral back to the writer
        payable(msg.sender).transfer(collateralAmount);

        emit CollateralWithdrawn(msg.sender, collateralAmount);
    }

    /**
     * @dev Fallback function to accept ETH.
     */
    receive() external payable {}
}