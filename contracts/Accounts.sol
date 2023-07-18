// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/access/Ownable.sol';

import './Tokens.sol';

contract Accounts is Ownable {
  struct CardTier {
    uint8 color;
    string logoUrl;
  }
  struct Cards {
    CardTier free;
    CardTier standard;
    CardTier premium;
  }
  struct CreatorAccount {
    bytes32 name;
    string title;
    string description;
    string avatarUrl;
    string bannerUrl;
    uint8[] interests;
    Cards cards;
    uint oboleId;
    bytes32 userId;
  }
  mapping(address => CreatorAccount) creatorAccounts;
  mapping(bytes32 => address) creatorAddressesByName;

  struct UserAccount {
    bytes32 username;
    string avatarUrl;
    uint8[] interests;
    bytes32 userId;
  }
  mapping(address => UserAccount) userAccounts;
  mapping(bytes32 => address) userAddressesByUsername;

  Tokens tokens;

  error NotCreatorError();
  error NotUserError();

  function setTokens(address tokensAddress) external onlyOwner {
    tokens = Tokens(tokensAddress);
  }

  modifier onlyCreator(bytes32 name) {
    if (creatorAddressesByName[name] != msg.sender) {
      revert NotCreatorError();
    }
    _;
  }

  modifier onlyUser(bytes32 username) {
    if (userAddressesByUsername[username] != msg.sender) {
      revert NotUserError();
    }
    _;
  }

  function getCreatorAccountByName(bytes32 name) external view returns (CreatorAccount memory) {
    address creator = creatorAddressesByName[name];
    return creatorAccounts[creator];
  }

  function createCreatorAccount(CreatorAccount memory creatorAccount) external {
    creatorAccount.oboleId = tokens.getCreatorOboleId();
    creatorAccounts[msg.sender] = creatorAccount;
    creatorAddressesByName[creatorAccount.name] = msg.sender;
  }

  function updateCreatorAccount(
    CreatorAccount memory creatorAccount
  ) external onlyCreator(creatorAccount.name) {
    creatorAccounts[msg.sender] = creatorAccount;
  }

  function getUserAccountByAddress(address user) external view returns (UserAccount memory) {
    return userAccounts[user];
  }

  function createUserAccount(UserAccount memory userAccount) external {
    userAccounts[msg.sender] = userAccount;
    userAddressesByUsername[userAccount.username] = msg.sender;
  }

  function updateUserAccount(
    UserAccount memory userAccount
  ) external onlyUser(userAccount.username) {
    userAccounts[msg.sender] = userAccount;
  }

  fallback() external {}
}
