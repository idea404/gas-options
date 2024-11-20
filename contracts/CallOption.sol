// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// TODO: implement attaching a method with params to call to the option purchase

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
        uint256 price;          // Price or premium per option (in wei)
    }

    struct Offer {
        address seller;
        uint256 amount;         // Number of options (gas units)
        uint256 price;          // Price or premium per option (in wei)
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
     * @dev Modifier to check if the caller is the admin.
     */
    modifier adminOnly() {
        require(msg.sender == address(0x0000000000000000000000000000000000000000), "Only the admin can call this function"); // TODO: change this address
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

    /**
     * @dev Places a bid in the order book.
     * @param _amount The number of options to buy.
     * @param _price The bid price per option in wei.
     */
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
        _checkSettleBid(bid);

        // If there's any remaining amount, add it to the bid book, sorted by price
        if (bid.amount > 0) {
            _insertSortBid(bid);
            emit BidPlaced(msg.sender, bid.amount, bid.price);
        }
    }

    /**
     * @dev Deletes a bid from the order book.
     * @param _bidIndex The index of the bid to delete.
     */
    function deleteBid(uint256 _bidIndex) external {
        require(_bidIndex < bids.length, "Invalid bid index");
        require(bids[_bidIndex].bidder == msg.sender, "Not the bid owner");

        // Refund the bid amount to the bidder
        uint256 refundAmount = bids[_bidIndex].amount * bids[_bidIndex].price;
        payable(msg.sender).transfer(refundAmount); // TODO: adapt to work on NIL blockchain

        // If this is not the last element, move the last bid to this position
        if (_bidIndex != bids.length - 1) {
            bids[_bidIndex] = bids[bids.length - 1];
        }
        
        emit BidDeleted(msg.sender, _bidIndex);
        bids.pop();
    }

    /**
     * @dev Places an offer in the order book.
     * @param _size The number of options (gas units) to sell.
     * @param _price The offer price or premium per option (in wei).
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

        // If there's any remaining amount, add it to the offer book, sorted by price
        if (offer.amount > 0) {
            _insertSortOffer(offer);
            emit OfferPlaced(msg.sender, offer.amount, offer.price);
        }
    }

    /**
     * @dev Deletes an offer from the order book.
     * @param _offerIndex The index of the offer to delete.
     */
    function deleteOffer(uint256 _offerIndex) external {
        require(_offerIndex < offers.length, "Invalid offer index");
        require(offers[_offerIndex].seller == msg.sender, "Not the offer owner");

        // Refund the collateral to the seller
        uint256 refundAmount = offers[_offerIndex].collateral;
        payable(msg.sender).transfer(refundAmount); // TODO: adapt to work on NIL blockchain

        // If this is not the last element, move the last offer to this position
        if (_offerIndex != offers.length - 1) {
            offers[_offerIndex] = offers[offers.length - 1];
        }
        
        emit OfferDeleted(msg.sender, _offerIndex);
        offers.pop();
    }

    function exercise(uint256 _amount) external notExpired {
        // TODO: implement
    }

    /**
     * @dev Checks if the bid can be settled with the offers and settles if so.
     * @param _bid The bid to check and settle.
     */
    function _checkSettleBid(Bid memory _bid) internal {
        // Iterate through offers while we still have bid amount to fill
        // and there are offers available at acceptable prices
        uint256 i = 0;
        while (i < offers.length && _bid.amount > 0) {
            // Skip if offer price is higher than bid price
            if (offers[i].price > _bid.price) {
                i++;
                continue;
            }

            // Calculate how much can be filled from this offer
            uint256 fillAmount = _bid.amount < offers[i].amount ? 
                               _bid.amount : offers[i].amount;

            // Create new position
            positions.push(Position({
                buyer: _bid.bidder,
                seller: offers[i].seller,
                size: fillAmount,
                collateral: (fillAmount * offers[i].price * COLLATERAL_FACTOR)
            }));

            // Transfer premium from buyer to seller
            payable(offers[i].seller).transfer(fillAmount * offers[i].price);

            // Update remaining amounts
            _bid.amount -= fillAmount;
            offers[i].amount -= fillAmount;
            offers[i].collateral -= (fillAmount * offers[i].price * COLLATERAL_FACTOR);

            // Emit events
            emit ShortPositionCreated(offers[i].seller, fillAmount, fillAmount * offers[i].price * COLLATERAL_FACTOR);
            emit LongPositionCreated(_bid.bidder, fillAmount, offers[i].price);

            // If offer is completely filled, remove it
            if (offers[i].amount == 0) {
                if (i != offers.length - 1) {
                    offers[i] = offers[offers.length - 1];
                }
                offers.pop();
            } else {
                i++;
            }
        }
    }

    /**
     * @dev Inserts a bid into the order book, maintaining descending price order.
     * @param _bid The bid to insert.
     */
    function _insertSortBid(Bid memory _bid) internal {
        // If bids array is empty, simply push the bid
        if (bids.length == 0) {
            bids.push(_bid);
            return;
        }

        // Find the correct position to insert (maintaining descending price order)
        uint256 i = 0;
        while (i < bids.length && bids[i].price > _bid.price) {
            i++;
        }

        // Extend array length by one
        bids.push(bids[bids.length - 1]);

        // Shift elements to make space for new bid
        for (uint256 j = bids.length - 1; j > i; j--) {
            bids[j] = bids[j - 1];
        }

        // Insert the new bid at position i
        bids[i] = _bid;
    }

    /**
     * @dev Checks if the offer can be settled with the bids and settles if so.
     * @param _offer The offer to check and settle.
     */
    function _checkSettleOffer(Offer memory _offer) internal {
        // Iterate through bids while we still have offer amount to fill
        // and there are bids available at acceptable prices
        uint256 i = 0;
        while (i < bids.length && _offer.amount > 0) {
            // Skip if bid price is lower than offer price
            if (bids[i].price < _offer.price) {
                i++;
                continue;
            }

            // Calculate how much can be filled from this bid
            uint256 fillAmount = _offer.amount < bids[i].amount ? 
                               _offer.amount : bids[i].amount;

            // Create new position
            positions.push(Position({
                buyer: bids[i].bidder,
                seller: _offer.seller,
                size: fillAmount,
                collateral: (fillAmount * _offer.price * COLLATERAL_FACTOR)
            }));

            // Transfer premium from buyer to seller
            payable(_offer.seller).transfer(fillAmount * _offer.price);

            // Update remaining amounts
            _offer.amount -= fillAmount;
            bids[i].amount -= fillAmount;
            _offer.collateral -= (fillAmount * _offer.price * COLLATERAL_FACTOR);

            // Emit events
            emit ShortPositionCreated(_offer.seller, fillAmount, fillAmount * _offer.price * COLLATERAL_FACTOR);
            emit LongPositionCreated(bids[i].bidder, fillAmount, _offer.price);

            // If bid is completely filled, remove it
            if (bids[i].amount == 0) {
                if (i != bids.length - 1) {
                    bids[i] = bids[bids.length - 1];
                }
                bids.pop();
            } else {
                i++;
            }
        }
    }

    function _insertSortOffer(Offer memory _offer) internal {
        // TODO: implement
    }

    function runAdminFunctions() external adminOnly {
        // TODO: implement, should be able to settle expired positions, liquidate undercollateralized positions, and withdraw collateral
    }

    function _liquidate(uint256 _positionIndex) external payable notExpired {
        // TODO: implement
    }

    function _withdrawCollateral(uint256 _positionIndex) external isExpired {
        // TODO: implement
    }

    /**
     * @dev Fallback function to accept ETH.
     */
    receive() external payable {}
}