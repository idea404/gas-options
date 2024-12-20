// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CallOption.sol";
import "./CollateralManager.sol";

/**
 * @title GasPriceOptionsFactory
 * @dev Factory contract to create new CallOption contracts.
 */
contract GasPriceOptionsFactory {
    address[] public allOptions;
    CollateralManager public collateralManager;

    // Admin address
    address public admin = 0x0001f1964a84Fe7c6e9b14461CC30ff194f7Ece9;

    /**
     * @dev Constructor to initialize the collateral manager.
     */
    constructor(address _collateralManager) {
        collateralManager = new CollateralManager(_collateralManager);
    }

    /**
     * @dev Creates a new CallOption contract.
     * @param _strike The strike price of the option.
     * @param _expiration The expiration timestamp of the option.
     * @return The address of the newly created CallOption contract.
     */
    function createOption(uint256 _strike, uint256 _expiration) external returns (address) {
        require(_expiration > block.timestamp, "Expiration must be in the future");
        CallOption option = new CallOption(
            _strike, 
            _expiration, 
            address(this),
            address(collateralManager),
            admin
        );
        allOptions.push(address(option));
        collateralManager.registerOption(address(option));
        return address(option);
    }

    /**
     * @dev Returns the total number of options created.
     */
    function getOptionsCount() external view returns (uint256) {
        return allOptions.length;
    }
}