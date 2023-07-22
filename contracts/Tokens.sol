// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/utils/math/Math.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import './StableCoin.sol';
import './Accounts.sol';

/**
 * @dev Contract managing all token types (membership card NFTs, obole SFTs, exclusivities SFTs)
 * using ERC1155
 */
contract Tokens is ERC1155 {
  using Counters for Counters.Counter;
  /**
   * @dev Global counter incremented each time we need to generate a new token id
   */
  Counters.Counter public globalCounter;
  /**
   * @dev One counter for each creator to keep track of individual member ids
   */
  mapping(bytes32 => Counters.Counter) memberCounters;
  /**
   * @dev Underlying representation of a membership card
   */
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
  /**
   * @dev Membership cards stored by token id
   */
  mapping(uint => MembershipCard) public membershipCards;
  /**
   * @dev Membership card token ids stored by user address
   */
  mapping(address => mapping(bytes32 => uint)) public membershipCardsByOwner;
  /**
   * @dev Representation of a subscription duration in months
   */
  enum SubscriptionDuration {
    None,
    Months1,
    Months3,
    Months6,
    Months12
  }
  mapping(SubscriptionDuration => uint8) subscriptionDurationInMonths;
  /**
   * @dev Membership card tiers price and rewards per second
   */
  mapping(bytes32 => uint) tierPrices;
  mapping(bytes32 => mapping(SubscriptionDuration => uint24)) tierRewards;
  /**
   * @dev Creator outstanding payments stored by creator address
   */
  mapping(address => uint) payouts;
  /**
   * @dev Output of token metadata
   */
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
  /**
   * @dev Sibling contracts addresses
   */
  StableCoin stableCoin;
  Accounts accounts;
  /**
   * @dev Custom errors
   * - NotAccountsError raised when trying to call getCreatorOboleId if msg.sender is not Accounts
   * - InvalidCreatorNameError raised when accessing a non-existent creator name
   * - InvalidUserAddressError raised when accessing a non-existent user address
   * - InvalidAmountError raised when trying to interact with a zero amount
   * - InvalidTokenIdError raised when token id not found
   * - AlreadyMemberError raised when trying to mint a membership card user already owns
   * - InvalidTierError raised when passing an invalid tier name
   * - InvalidSubscriptionDurationError raised when passing an invalid subscription duration
   * - NotAMemberError raised when trying to subscribe to a paid membership while not being a member
   * - ActiveSubscriptionError raised when trying to subscribe to a paid membership while an active
   * subscription is still ongoing
   */
  error NotAccountsError();
  error InvalidCreatorNameError(bytes32 creatorName);
  error InvalidUserAddressError(address userAddress);
  error InvalidAmountError();
  error InvalidTokenIdError(uint tokenId);
  error AlreadyMemberError();
  error InvalidTierError(bytes32 tier);
  error InvalidSubscriptionDurationError();
  error NotAMemberError(address account);
  error ActiveSubscriptionError();
  /**
   * @dev Constructor initializing token URI, sibling contracts addresses and contract constants
   * @param uri token URI
   * @param stableCoinAddress stable coin contract address
   * @param accountsAddress accounts contract address
   */
  constructor(string memory uri, address stableCoinAddress, address accountsAddress) ERC1155(uri) {
    stableCoin = StableCoin(stableCoinAddress);
    accounts = Accounts(accountsAddress);
    tierPrices['standard'] = 15;
    tierPrices['premium'] = 30;
    uint24[4] memory standardRewards = [57871, 60765, 63658, 66552];
    uint24[4] memory premiumRewards = [115741, 121528, 127315, 133102];
    uint8[4] memory months = [1, 3, 6, 12];
    for (uint8 i = 0; i < 4; ++i) {
      SubscriptionDuration subscriptionDuration = SubscriptionDuration(i + 1);
      tierRewards['standard'][subscriptionDuration] = standardRewards[i];
      tierRewards['premium'][subscriptionDuration] = premiumRewards[i];
      subscriptionDurationInMonths[subscriptionDuration] = months[i];
    }
  }
  /**
   * @dev Modifier used to guard against calling getCreatorOboleId if msg.sender is not Accounts
   */
  modifier onlyAccounts() {
    if (msg.sender != address(accounts)) {
      revert NotAccountsError();
    }
    _;
  }
  /**
   * @dev Returns a unique obole id for a newly created creator account
   * @return uint
   */
  function getCreatorOboleId() external onlyAccounts returns (uint) {
    globalCounter.increment();
    return globalCounter.current();
  }
  /**
   * @dev Mints a new free membership card of a given creator
   * @param creatorName creator name
   */
  function mintMembershipCard(bytes32 creatorName) external {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(creatorName);
    }
    Accounts.UserAccount memory userAccount = accounts.getUserAccountByAddress(msg.sender);
    if (userAccount.username == 0) {
      revert InvalidUserAddressError(msg.sender);
    }
    uint membershipCardTokenId = membershipCardsByOwner[msg.sender][creatorName];
    if (membershipCardTokenId != 0) {
      revert AlreadyMemberError();
    }
    Counters.Counter storage counter = memberCounters[creatorName];
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
    membershipCardsByOwner[msg.sender][creatorName] = tokenId;
    _mint(msg.sender, tokenId, 1, '');
  }
  /**
   * @dev Returns a creator account card tier config
   * @param creatorAccount creator account
   * @param tier card tier
   * @return CardTier
   */
  function getCardTier(
    Accounts.CreatorAccount memory creatorAccount,
    bytes32 tier
  ) internal pure returns (Accounts.CardTier memory) {
    if (tier == 'premium') {
      return creatorAccount.cards.premium;
    } else if (tier == 'standard') {
      return creatorAccount.cards.standard;
    } else {
      return creatorAccount.cards.free;
    }
  }
  /**
   * @dev Returns a membership card token data
   * @param membershipCard membership card
   * @return TokenData
   */
  function getMembershipCardData(
    MembershipCard memory membershipCard
  ) internal view returns (TokenData memory) {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(
      membershipCard.creatorName
    );
    Accounts.UserAccount memory userAccount = accounts.getUserAccountByAddress(
      membershipCard.userAddress
    );
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
  /**
   * @dev Returns an obole token data
   * @param creatorAccount creator account
   * @return TokenData
   */
  function getOboleData(
    Accounts.CreatorAccount memory creatorAccount
  ) internal pure returns (TokenData memory) {
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
  /**
   * @dev Returns token data for a given token id
   * @param tokenId token id
   * @return TokenData
   */
  function getTokenData(uint tokenId) external view returns (TokenData memory) {
    MembershipCard memory membershipCard = membershipCards[tokenId];
    if (membershipCard.creatorName == 0) {
      Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByOboleId(tokenId);
      if (creatorAccount.name == 0) {
        revert InvalidTokenIdError(tokenId);
      }
      return getOboleData(creatorAccount);
    }
    return getMembershipCardData(membershipCard);
  }
  /**
   * @dev Make a donation in stable coins to a creator and receive oboles in return
   * @param creatorName creator name
   * @param amount stable coin amount
   */
  function donate(bytes32 creatorName, uint amount) external {
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    if (creatorAccount.name == 0) {
      revert InvalidCreatorNameError(creatorName);
    }
    if (amount == 0) {
      revert InvalidAmountError();
    }
    address creatorAddress = accounts.getCreatorAddressByName(creatorName);
    stableCoin.transferFrom(msg.sender, address(this), amount);
    payouts[creatorAddress] += amount;
    // 1 USDC (6 decimals) = 10 OBO (9 decimals)
    _mint(msg.sender, creatorAccount.oboleId, amount * 10 ** 4, '');
  }
  /**
   * @dev Subscribe to a creator paid membership to upgrade a membership card tier and receive
   * rewards in obole
   * @param creatorName creator name
   * @param tier membership card tier
   * @param subscriptionDuration duration in months
   */
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
    if (subscriptionDuration == SubscriptionDuration.None) {
      revert InvalidSubscriptionDurationError();
    }
    uint tokenId = membershipCardsByOwner[msg.sender][creatorName];
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    MembershipCard storage membershipCard = membershipCards[tokenId];
    if (membershipCard.tier == tier && block.timestamp < membershipCard.subscriptionEndTimestamp) {
      revert ActiveSubscriptionError();
    }
    address creatorAddress = accounts.getCreatorAddressByName(creatorName);
    uint months = subscriptionDurationInMonths[subscriptionDuration];
    uint amount = price * months * 10 ** 6;
    stableCoin.transferFrom(msg.sender, address(this), amount);
    payouts[creatorAddress] += amount;
    membershipCard.tier = tier;
    membershipCard.subscriptionDuration = subscriptionDuration;
    membershipCard.subscriptionStartTimestamp = block.timestamp;
    membershipCard.subscriptionEndTimestamp = block.timestamp + months * 30 days;
  }
  /**
   * @dev Returns rewards accumulated for a given membership card token id
   * @param tokenId token id
   * @return uint
   */
  function _rewardsAmount(uint tokenId) internal view returns (uint) {
    MembershipCard memory membershipCard = membershipCards[tokenId];
    uint rewardsPerSecond = tierRewards[membershipCard.tier][membershipCard.subscriptionDuration];
    uint lastTimeRewardsApplicable = Math.min(
      block.timestamp,
      membershipCard.subscriptionEndTimestamp
    );
    uint subscriptionTime = (lastTimeRewardsApplicable - membershipCard.subscriptionStartTimestamp);
    return subscriptionTime * rewardsPerSecond;
  }
  /**
   * @dev Returns rewards accumulated for a given account and creator name
   * @param account user address
   * @param creatorName creator name
   * @return uint
   */
  function rewardsAmount(address account, bytes32 creatorName) public view returns (uint) {
    uint tokenId = membershipCardsByOwner[account][creatorName];
    if (tokenId == 0) {
      revert NotAMemberError(account);
    }
    return _rewardsAmount(tokenId);
  }
  /**
   * @dev Claim rewards accumulated by a user for a given creator name
   * @param creatorName creator name
   */
  function claimRewards(bytes32 creatorName) external {
    uint tokenId = membershipCardsByOwner[msg.sender][creatorName];
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    Accounts.CreatorAccount memory creatorAccount = accounts.getCreatorAccountByName(creatorName);
    uint amount = _rewardsAmount(tokenId);
    MembershipCard storage membershipCard = membershipCards[tokenId];
    uint lastTimeRewardsApplicable = Math.min(
      block.timestamp,
      membershipCard.subscriptionEndTimestamp
    );
    membershipCard.subscriptionStartTimestamp = lastTimeRewardsApplicable;
    _mint(msg.sender, creatorAccount.oboleId, amount, '');
  }
  /**
   * @dev Returns a creator outstanding payment balance in stable coin
   * @param account creator address
   * @return uint
   */
  function payoutsAmount(address account) public view returns (uint) {
    return payouts[account];
  }
  /**
   * @dev Withdraw creator payouts entirely
   */
  function withdraw() external {
    uint payout = payouts[msg.sender];
    if (payout == 0) {
      revert InvalidAmountError();
    }
    payouts[msg.sender] = 0;
    stableCoin.transfer(msg.sender, payout);
  }
}
