// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import './Accounts.sol';

contract Tokens is ERC1155 {
  using Counters for Counters.Counter;
  Counters.Counter globalCounter;
  mapping(bytes32 => Counters.Counter) membershipCardsCounters;
  struct MembershipCard {
    bytes32 creatorName;
    address userAddress;
    uint memberId;
  }
  mapping(uint => MembershipCard) membershipCards;
  struct MembershipCardData {
    string logoUrl;
    bytes32 tier;
    uint memberId;
    uint subscriptionStartTimestamp;
    uint subscriptionEndTimestamp;
    bytes32 username;
    string avatarUrl;
    uint oboleBalance;
    string title;
    string description;
    bytes32 name;
    uint8 color;
  }
  Accounts accounts;

  error NotAccountsError();
  error InvalidCreatorNameError(bytes32 creatorName);
  error InvalidUserAddressError(address userAddress);

  constructor(address accountsAddress) ERC1155('http://localhost:3000/api/tokens/{id}.json') {
    accounts = Accounts(accountsAddress);
  }

  function getCreatorOboleId() external returns (uint) {
    if (msg.sender != address(accounts)) {
      revert NotAccountsError();
    }
    globalCounter.increment();
    return globalCounter.current();
  }

  function mintMembershipCard(bytes32 creatorName) external {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(creatorName);
    }
    Accounts.UserAccount memory userAccount = accounts.getUserAccountByAddress(msg.sender);
    if (userAccount.username == 0) {
      revert InvalidUserAddressError(msg.sender);
    }
    //
    Counters.Counter storage counter = membershipCardsCounters[creatorName];
    counter.increment();
    uint memberId = counter.current();
    globalCounter.increment();
    uint tokenId = globalCounter.current();
    membershipCards[tokenId] = MembershipCard({
      creatorName: creatorName,
      userAddress: msg.sender,
      memberId: memberId
    });
    _mint(msg.sender, tokenId, 1, '');
  }

  function getMembershipCardData(uint tokenId) external view returns (MembershipCardData memory) {
    MembershipCard storage membershipCard = membershipCards[tokenId];
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(
      membershipCard.creatorName
    );
    Accounts.UserAccount memory userAccount = accounts.getUserAccountByAddress(
      membershipCard.userAddress
    );
    uint oboleBalance = balanceOf(membershipCard.userAddress, creatorAccount.oboleId);
    return
      MembershipCardData({
        color: creatorAccount.cards.free.color,
        logoUrl: creatorAccount.cards.free.logoUrl,
        tier: 'free',
        memberId: membershipCard.memberId,
        subscriptionStartTimestamp: 0,
        subscriptionEndTimestamp: 0,
        username: userAccount.username,
        avatarUrl: userAccount.avatarUrl,
        oboleBalance: oboleBalance,
        title: creatorAccount.title,
        description: creatorAccount.description,
        name: membershipCard.creatorName
      });
  }

  fallback() external {}
}
