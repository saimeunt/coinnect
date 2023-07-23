// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';

import './Tokens.sol';

/**
 * @dev Contract storing creator and user accounts and create/update logic
 */
contract Accounts is Ownable {
  /**
   * @dev Membership card tiers info: card color and accompanying logo
   */
  struct CardTier {
    uint8 color;
    string logoUrl;
  }
  /**
   * @dev List of membership card tiers available
   */
  struct Cards {
    CardTier free;
    CardTier standard;
    CardTier premium;
  }
  /**
   * @dev Creator account identified by its unique name
   */
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
  /**
   * @dev Creator accounts stored by address along with lookup tables by name and obole id
   */
  mapping(address => CreatorAccount) creatorAccounts;
  mapping(bytes32 => address) creatorAddressesByName;
  mapping(uint => address) creatorAddressesByOboleId;
  /**
   * @dev User account identified by its unique username
   */
  struct UserAccount {
    bytes32 username;
    string avatarUrl;
    uint8[] interests;
    bytes32 userId;
  }
  /**
   * @dev User accounts stored by address
   */
  mapping(address => UserAccount) userAccounts;
  /**
   * @dev Tokens sibling contract used to assign a unique obole id when creating a creator account
   */
  Tokens public tokens;
  /**
   * @dev Custom errors
   * - NotCreatorError raised when trying to update a creator account if msg.sender is not the owner
   * - NotUserError raised when trying to update a user account if msg.sender is not the owner
   * - InvalidCreatorAccountError raised when trying to create a creator account with invalid params
   * - InvalidUserAccountError raised when trying to create a user account with invalid params
   * - CreatorAlreadyExistsError raised when trying to create a creator account with an existing
   * name
   * - UserAlreadyExistsError raised when trying to create a creator account with an existing
   * username
   */
  error NotCreatorError();
  error NotUserError();
  error InvalidCreatorAccountError();
  error InvalidUserAccountError();
  error CreatorAlreadyExistsError();
  error UserAlreadyExistsError();
  /**
   * @dev Modifier used to guard against updating a creator account if not the owner
   */
  modifier onlyCreator() {
    if (creatorAccounts[msg.sender].name == 0) {
      revert NotCreatorError();
    }
    _;
  }
  /**
   * @dev Modifier used to guard against updating a user account if not the owner
   */
  modifier onlyUser() {
    if (userAccounts[msg.sender].username == 0) {
      revert NotUserError();
    }
    _;
  }

  /**
   * @dev Set the Tokens sibling contract address which is deployed after Accounts
   * @param tokensAddress tokens contract address
   */
  function setTokens(address tokensAddress) external onlyOwner {
    tokens = Tokens(tokensAddress);
  }

  /**
   * @dev Creates a new creator account
   * @param creatorAccount new creator account params
   */
  function createCreatorAccount(CreatorAccount memory creatorAccount) external {
    if (
      creatorAccount.name == 0 ||
      bytes(creatorAccount.title).length == 0 ||
      creatorAccount.interests.length == 0 ||
      creatorAccount.userId == 0
    ) {
      revert InvalidCreatorAccountError();
    }
    if (creatorAccounts[msg.sender].name != 0) {
      revert CreatorAlreadyExistsError();
    }
    creatorAccount.oboleId = tokens.getCreatorOboleId();
    creatorAccounts[msg.sender] = creatorAccount;
    creatorAddressesByName[creatorAccount.name] = msg.sender;
    creatorAddressesByOboleId[creatorAccount.oboleId] = msg.sender;
  }

  /**
   * @dev Returns a creator account by name
   * @param name creator name
   * @return CreatorAccount
   */
  function getCreatorAccountByName(bytes32 name) external view returns (CreatorAccount memory) {
    address creator = creatorAddressesByName[name];
    return creatorAccounts[creator];
  }

  /**
   * @dev Returns a creator account by obole id
   * @param oboleId obole id
   * @return CreatorAccount
   */
  function getCreatorAccountByOboleId(uint oboleId) external view returns (CreatorAccount memory) {
    address creator = creatorAddressesByOboleId[oboleId];
    return creatorAccounts[creator];
  }

  /**
   * @dev Returns a creator address by name
   * @param name creator name
   * @return address
   */
  function getCreatorAddressByName(bytes32 name) external view returns (address) {
    return creatorAddressesByName[name];
  }

  /**
   * @dev Updates a creator account
   * @param creatorAccount updated creator account params
   */
  function updateCreatorAccount(CreatorAccount memory creatorAccount) external onlyCreator {
    if (
      creatorAccount.name != creatorAccounts[msg.sender].name ||
      creatorAccount.oboleId != creatorAccounts[msg.sender].oboleId ||
      creatorAccount.userId != creatorAccounts[msg.sender].userId
    ) {
      revert InvalidCreatorAccountError();
    }
    creatorAccounts[msg.sender] = creatorAccount;
  }

  /**
   * @dev Creates a new user account
   * @param userAccount new user account params
   */
  function createUserAccount(UserAccount memory userAccount) external {
    if (userAccount.username == 0 || userAccount.interests.length == 0 || userAccount.userId == 0) {
      revert InvalidUserAccountError();
    }
    if (userAccounts[msg.sender].username != 0) {
      revert UserAlreadyExistsError();
    }
    userAccounts[msg.sender] = userAccount;
  }

  /**
   * @dev Returns a user account by address
   * @param user user address
   * @return UserAccount
   */
  function getUserAccountByAddress(address user) external view returns (UserAccount memory) {
    return userAccounts[user];
  }

  /**
   * @dev Updates a user account
   * @param userAccount updated user account params
   */
  function updateUserAccount(UserAccount memory userAccount) external onlyUser {
    if (
      userAccount.username != userAccounts[msg.sender].username ||
      userAccount.userId != userAccounts[msg.sender].userId
    ) {
      revert InvalidUserAccountError();
    }
    userAccounts[msg.sender] = userAccount;
  }
}
