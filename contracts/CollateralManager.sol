// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title CollateralManager
 * @dev Manages collateral for all option contracts
 */
contract CollateralManager {
    address public factory;
    mapping(address => uint256) public collateral;
    mapping(address => bool) public validOptions;

    event CollateralAdded(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    event CollateralReserved(address indexed optionContract, uint256 amount);
    event CollateralReturned(address indexed optionContract, uint256 amount);
    event OptionRegistered(address indexed optionContract);

    modifier onlyFactory() {
        require(msg.sender == factory, "Only factory can call");
        _;
    }

    modifier onlyOption() {
        require(validOptions[msg.sender], "Only valid options can call");
        _;
    }

    constructor(address _factory) {
        factory = _factory;
    }

    function registerOption(address _option) external onlyFactory {
        validOptions[_option] = true;
        emit OptionRegistered(_option);
    }

    function addCollateral() external payable {
        collateral[msg.sender] += msg.value;
        emit CollateralAdded(msg.sender, msg.value);
    }

    function getCollateral(address _user) external view returns (uint256) {
        return collateral[_user];
    }

    function withdrawCollateral(uint256 _amount) external {
        require(collateral[msg.sender] >= _amount, "Insufficient collateral");
        collateral[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit CollateralWithdrawn(msg.sender, _amount);
    }

    function reserveCollateral(address _seller, uint256 _amount) external onlyOption {
        collateral[_seller] -= _amount;
        emit CollateralReserved(_seller, _amount);
    }

    function returnCollateral(address _seller, uint256 _amount) external onlyOption {
        collateral[_seller] += _amount;
        emit CollateralReturned(_seller, _amount);
    }

    function sendNative(address _to, uint256 _amount) external onlyOption {
        payable(_to).transfer(_amount);
    }

    receive() external payable {}
}