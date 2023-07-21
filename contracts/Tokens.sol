// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import 'hardhat/console.sol';

import "@openzeppelin/contracts/utils/math/Math.sol";
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import './StableCoin.sol';
import './Accounts.sol';

contract Tokens is ERC1155 {
  using Counters for Counters.Counter;
  Counters.Counter globalCounter;
  mapping(bytes32 => Counters.Counter) membershipCardsCounters;
  struct MembershipCard {
    bytes32 creatorName;
    address userAddress;
    bytes32 tier;
    uint memberId;
    uint mintTimestamp;
    SubscriptionDuration subscriptionDuration;
    uint subscriptionStartTimestamp;
    uint subscriptionEndTimestamp;
  }
  mapping(uint => MembershipCard) membershipCards;
  mapping(address => uint[]) membershipCardsByOwner;
  enum SubscriptionDuration {
    None,
    Months1,
    Months3,
    Months6,
    Months12
  }
  mapping(bytes32 => uint) tierPrices;
  mapping(bytes32 => mapping(SubscriptionDuration => uint24)) tierRewards;
  struct TokenData {
    uint8 color;
    string logoUrl;
    bytes32 tier;
    uint memberId;
    uint mintTimestamp;
    uint subscriptionEndTimestamp;
    bytes32 username;
    string avatarUrl;
    uint oboleBalance;
    string title;
    string description;
    bytes32 name;
  }
  StableCoin stableCoin;
  mapping(address => uint) balances;
  Accounts accounts;

  error NotAccountsError();
  error InvalidCreatorNameError(bytes32 creatorName);
  error InvalidUserAddressError(address userAddress);
  error InvalidAmountError(uint amount);
  error InvalidTokenIdError(uint tokenId);
  error InvalidTierError(bytes32 tier);
  error AlreadyMemberError();
  error NotAMemberError(address account);

  constructor(string memory uri, address stableCoinAddress, address accountsAddress) ERC1155(uri) {
    stableCoin = StableCoin(stableCoinAddress);
    accounts = Accounts(accountsAddress);
    tierPrices['standard'] = 15;
    tierPrices['premium'] = 30;
    uint24[4] memory standardRewards = [57871, 60765, 63658, 66552];
    uint24[4] memory premiumRewards = [115741, 121528, 127315, 133102];
    for (uint8 i = 0; i < 4; ++i) {
      tierRewards['standard'][SubscriptionDuration(i)] = standardRewards[i];
      tierRewards['premium'][SubscriptionDuration(i)] = premiumRewards[i];
    }
  }

  modifier onlyAccounts() {
    if (msg.sender != address(accounts)) {
      revert NotAccountsError();
    }
    _;
  }

  function getSubcriptionDurationInMonths(
    SubscriptionDuration subscriptionDuration
  ) internal pure returns (uint) {
    if (subscriptionDuration == SubscriptionDuration.Months1) {
      return 1;
    } else if (subscriptionDuration == SubscriptionDuration.Months3) {
      return 3;
    } else if (subscriptionDuration == SubscriptionDuration.Months6) {
      return 6;
    } else if (subscriptionDuration == SubscriptionDuration.Months12) {
      return 12;
    }
    return 0;
  }

  function getCreatorOboleId() external onlyAccounts returns (uint) {
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
    uint membershipCardTokenId = getMembershipCardTokenId(msg.sender, creatorName);
    if (membershipCardTokenId != 0 ){
      revert AlreadyMemberError();
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
      tier: 'free',
      memberId: memberId,
      mintTimestamp: block.timestamp,
      subscriptionDuration: SubscriptionDuration.None,
      subscriptionStartTimestamp: 0,
      subscriptionEndTimestamp: 0
    });
    membershipCardsByOwner[msg.sender].push(tokenId);
    _mint(msg.sender, tokenId, 1, '');
  }

  function getCardTier(Accounts.CreatorAccount memory creatorAccount, bytes32 tier) internal pure returns (Accounts.CardTier memory) {
    if (tier == 'premium') {
      return creatorAccount.cards.premium;
    } else if (tier == 'standard') {
      return creatorAccount.cards.standard;
    } else {
      return creatorAccount.cards.free;
    }
  }

  function getMembershipCardData(MembershipCard memory membershipCard) internal view returns (TokenData memory) {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(
      membershipCard.creatorName
    );
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(membershipCard.creatorName);
    }
    Accounts.UserAccount memory userAccount = accounts.getUserAccountByAddress(
      membershipCard.userAddress
    );
    if (userAccount.username == 0) {
      revert InvalidUserAddressError(membershipCard.userAddress);
    }
    uint oboleBalance = balanceOf(membershipCard.userAddress, creatorAccount.oboleId);
    Accounts.CardTier memory cardTier = getCardTier(creatorAccount, membershipCard.tier);
    return
      TokenData({
        color: cardTier.color,
        logoUrl: cardTier.logoUrl,
        tier: membershipCard.tier,
        memberId: membershipCard.memberId,
        mintTimestamp: membershipCard.mintTimestamp,
        subscriptionEndTimestamp: membershipCard.subscriptionEndTimestamp,
        username: userAccount.username,
        avatarUrl: userAccount.avatarUrl,
        oboleBalance: oboleBalance,
        title: creatorAccount.title,
        description: creatorAccount.description,
        name: membershipCard.creatorName
      });
  }

  function getOboleData(Accounts.CreatorAccount memory creatorAccount) internal pure returns (TokenData memory) {
    return
      TokenData({
        color: 0,
        logoUrl: creatorAccount.avatarUrl,
        tier: 0,
        memberId: 0,
        mintTimestamp: 0,
        subscriptionEndTimestamp: 0,
        username: creatorAccount.name,
        avatarUrl: creatorAccount.avatarUrl,
        oboleBalance: 0,
        title: creatorAccount.title,
        description: creatorAccount.description,
        name: creatorAccount.name
      });
  }

  function getTokenData(uint tokenId) external view returns (TokenData memory) {
    MembershipCard memory membershipCard = membershipCards[tokenId];
    if (membershipCard.creatorName == 0) {
      Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByOboleId(
        tokenId
      );
      if (creatorAccount.name == 0) {
        revert InvalidTokenIdError(tokenId);
      }
      return getOboleData(creatorAccount);
    }
    return getMembershipCardData(membershipCard);
  }

  function donate(bytes32 creatorName, uint amount) external {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(creatorName);
    }
    if (amount == 0) {
      revert InvalidAmountError(amount);
    }
    address creatorAddress = accounts.getCreatorAddressByName(creatorName);
    stableCoin.transferFrom(msg.sender, address(this), amount);
    balances[creatorAddress] += amount;
    // 1 USDC (6 decimals) = 10 OBO (9 decimals)
    _mint(msg.sender, creatorAccount.oboleId, amount * 10 ** 4, '');
  }

  function getMembershipCardTokenId(
    address account,
    bytes32 creatorName
  ) internal view returns (uint) {
    uint[] memory tokenIds = membershipCardsByOwner[account];
    uint tokenId = 0;
    for (uint i = 0; i < tokenIds.length; ++i) {
      tokenId = tokenIds[i];
      if (membershipCards[tokenId].creatorName == creatorName) {
        break;
      }
    }
    return tokenId;
  }

  function subscribe(
    bytes32 creatorName,
    bytes32 tier,
    SubscriptionDuration subscriptionDuration
  ) external {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(creatorName);
    }
    uint price = tierPrices[tier];
    if (price == 0) {
      revert InvalidTierError(tier);
    }
    uint tokenId = getMembershipCardTokenId(msg.sender, creatorName);
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    address creatorAddress = accounts.getCreatorAddressByName(creatorName);
    uint months = getSubcriptionDurationInMonths(subscriptionDuration);
    uint amount = price * months * 10 ** 6;
    stableCoin.transferFrom(msg.sender, address(this), amount);
    balances[creatorAddress] += amount;
    MembershipCard storage membershipCard = membershipCards[tokenId];
    membershipCard.tier = tier;
    membershipCard.subscriptionStartTimestamp = block.timestamp;
    membershipCard.subscriptionEndTimestamp = block.timestamp + months * 30 days;
  }

  function _rewardsAmount(uint tokenId) internal view returns (uint) {
    MembershipCard memory membershipCard = membershipCards[tokenId];
    uint rewardsPerSecond = tierRewards[membershipCard.tier][membershipCard.subscriptionDuration];
    uint lastTimeRewardsApplicable = Math.min(block.timestamp, membershipCard.subscriptionEndTimestamp);
    uint subscriptionTime = (lastTimeRewardsApplicable - membershipCard.subscriptionStartTimestamp);
    return subscriptionTime * rewardsPerSecond;
  }

  function rewardsAmount(address account, bytes32 creatorName) public view returns (uint) {
    uint tokenId = getMembershipCardTokenId(account, creatorName);
    if (tokenId == 0) {
      revert NotAMemberError(account);
    }
    return _rewardsAmount(tokenId);
  }

  function claimRewards(bytes32 creatorName) external {
    uint tokenId = getMembershipCardTokenId(msg.sender, creatorName);
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    uint amount = _rewardsAmount(tokenId);
    MembershipCard storage membershipCard = membershipCards[tokenId];
    uint lastTimeRewardsApplicable = Math.min(block.timestamp, membershipCard.subscriptionEndTimestamp);
    membershipCard.subscriptionStartTimestamp = lastTimeRewardsApplicable;
    _mint(msg.sender, creatorAccount.oboleId, amount, '');
  }

  function withdraw() external {
    uint balance = balances[msg.sender];
    balances[msg.sender] = 0;
    stableCoin.transfer(msg.sender, balance);
  }

  fallback() external {}
}
