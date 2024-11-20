// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CollateralManager.sol";

// TODO: implement attaching a method with params to call to the option purchase
// TODO: change block timestamp to block.number

/**
 * @title CallOption
 * @dev Represents an American-style Call Option on the EVM Gas Price.
 */
contract CallOption {
    CollateralManager public collateralManager;

    // Option parameters
    uint256 public strike;        // Strike price (in wei)
    uint256 public expiration;    // Expiration timestamp
    address public factory;       // Address of the factory that created this option

    // Market fee (0.5%)
    uint256 constant MARKET_FEE = 5;

    // Collateralization factor (3x)
    uint256 constant COLLATERAL_FACTOR = 3;

    // Structs for positions
    struct Position {
        address buyer;
        address seller;
        uint256 size;           // Number of options (gas units)
        uint256 collateral;     // Collateral deposited (in wei)
    }

    // Offers struct
    struct Offer {
        address seller;
        uint256 amount;             // Number of options (gas units)
        uint256 price;              // Price or premium per option (in wei)
        uint256 requiredCollateral; // Required collateral for the full offer
    }

    // Arrays to keep track of positions
    Position[] public positions;

    // Order books
    Offer[] public offers;

    // Events
    event OfferPlaced(address indexed seller, uint256 amount, uint256 price);
    event OfferDeleted(address indexed seller, uint256 index);

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
    constructor(uint256 _strike, uint256 _expiration, address _factory, address _collateralManager) {
        require(_expiration > block.timestamp, "Expiration must be in the future");
        strike = _strike;
        expiration = _expiration;
        factory = _factory;
        collateralManager = CollateralManager(payable(_collateralManager));
    }

    /**
     * @dev Places an offer in the offer book.
     * @param _size The number of options (gas units) to sell.
     * @param _price The offer price or premium per option (in wei).
     */
    function placeOffer(uint256 _size, uint256 _price) external notExpired {
        require(_size > 0, "Amount must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        Offer memory offer = Offer({
            seller: msg.sender,
            amount: _size,
            price: _price,
            requiredCollateral: COLLATERAL_FACTOR * _size * _price
        });

        offers.push(offer);
        emit OfferPlaced(msg.sender, offer.amount, offer.price);
    }

    /**
     * @dev Deletes an offer from the offer book.
     * @param _offerIndex The index of the offer to delete.
     */
    function deleteOffer(uint256 _offerIndex) external {
        require(_offerIndex < offers.length, "Invalid offer index");
        require(offers[_offerIndex].seller == msg.sender, "Only the seller can delete this offer");

        // Emit event before deleting the offer
        emit OfferDeleted(msg.sender, _offerIndex);

        // Remove the offer by replacing it with the last offer and then popping the last element
        offers[_offerIndex] = offers[offers.length - 1];
        offers.pop();
    }

    /**
     * @dev Buys an offer from the offer book.
     * @param _offerIndex The index of the offer to buy.
     */
    function buyOffer(uint256 _offerIndex) external payable notExpired {
        require(msg.value > 0, "Must send ETH to buy offers");
        Offer memory offer = offers[_offerIndex];
        require(offer.amount > 0, "Offer has no units left");
        uint256 offerValue = offer.amount * offer.price;
        require(msg.value >= offerValue + (MARKET_FEE * offerValue / 1000), "Insufficient ETH sent");

        // Check if seller has enough collateral
        uint256 requiredCollateral = COLLATERAL_FACTOR * offer.amount * strike;
        bool sellerHasCollateral = collateralManager.getCollateral(offer.seller) >= requiredCollateral;
        require(sellerHasCollateral, "Insufficient seller collateral");

        // Create new position
        Position memory newPosition = Position({
            buyer: msg.sender,
            seller: offer.seller,
            size: offer.amount,
            collateral: requiredCollateral
        });
        positions.push(newPosition);

        // Reserve collateral from seller
        collateralManager.reserveCollateral(offer.seller, requiredCollateral);

        // Transfer premium to seller
        (bool success, ) = payable(offer.seller).call{value: offerValue}(""); // TODO: check if this is the correct way to transfer
        require(success, "Failed to transfer premium to seller");

        // Remove the offer
        offers[_offerIndex] = offers[offers.length - 1];
        offers.pop();
    }

    /**
     * @dev Exercises a position.
     * @param _positionIndex The index of the position to exercise.
     */
    function exercise(uint256 _positionIndex) external notExpired {
        require(_positionIndex < positions.length, "Invalid position index");
        Position storage position = positions[_positionIndex];
        require(position.buyer == msg.sender, "Only buyer can exercise");
        require(position.size > 0, "Position already exercised");

        // Get current gas price (in wei)
        uint256 currentPrice = tx.gasprice; // TODO: check if this is the correct way to get the gas price
        
        // Check if option is ITM (current price > strike price)
        require(currentPrice > strike, "Option not ITM");

        // Calculate the profit
        uint256 priceSpread = currentPrice - strike;
        uint256 totalValue = priceSpread * position.size;

        // Calculate how much of the collateral to send
        uint256 collateralToSend;
        if (totalValue >= position.collateral) {
            // If profit exceeds collateral, send all collateral
            collateralToSend = position.collateral;
        } else {
            // Otherwise, send proportional amount
            collateralToSend = totalValue;
        }

        // Return remaining collateral to seller
        uint256 remainingCollateral = position.collateral - collateralToSend;
        if (remainingCollateral > 0) {
            collateralManager.returnCollateral(position.seller, remainingCollateral);
        }

        // Send profit to buyer
        collateralManager.sendNative(msg.sender, collateralToSend);

        // Clear the position
        position.size = 0;
        position.collateral = 0;
    }

    /**
     * @dev Settles all positions that expired.
     */
    function settlePositions() external adminOnly isExpired {
        uint256 currentGasPrice = tx.gasprice; // TODO: check if this is the correct way to get the gas price

        if (strike >= currentGasPrice) {
            // Iterate through all positions
            for (uint256 i = 0; i < positions.length; i++) {
                Position storage position = positions[i];
                
                // Only process positions that haven't been exercised yet
                if (position.size > 0) {
                    // Return all collateral to the seller since option expired
                    if (position.collateral > 0) {
                        collateralManager.returnCollateral(position.seller, position.collateral);
                    }
                    
                    // Clear the position
                    position.size = 0;
                    position.collateral = 0;
                }
            }
            return;
        }

        // Else we exercise all positions
        for (uint256 i = 0; i < positions.length; i++) {
            _exerciseInternal(i);
        }
    }

    /**
     * @dev Internal function to exercise a position.
     * @param _positionIndex The index of the position to exercise.
     */
    function _exerciseInternal(uint256 _positionIndex) internal {
        Position storage position = positions[_positionIndex];
        
        // Skip if position has already been exercised
        if (position.size == 0) return;

        // Get current gas price (in wei)
        uint256 currentPrice = tx.gasprice; // TODO: check if this is the correct way to get the gas price
        
        // Calculate the profit
        uint256 priceSpread = currentPrice - strike;
        uint256 totalValue = priceSpread * position.size;

        // Calculate how much of the collateral to send
        uint256 collateralToSend;
        if (totalValue >= position.collateral) {
            // If profit exceeds collateral, send all collateral
            collateralToSend = position.collateral;
        } else {
            // Otherwise, send proportional amount
            collateralToSend = totalValue;
        }

        // Return remaining collateral to seller
        uint256 remainingCollateral = position.collateral - collateralToSend;
        if (remainingCollateral > 0) {
            collateralManager.returnCollateral(position.seller, remainingCollateral);
        }

        // Send profit to buyer
        collateralManager.sendNative(position.buyer, collateralToSend);

        // Clear the position
        position.size = 0;
        position.collateral = 0;
    }

    /**
     * @dev Fallback function to accept ETH.
     */
    receive() external payable {}
}