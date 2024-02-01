// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import '@openzeppelin/contracts/utils/math/Math.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import './StableCoin.sol';

contract Coinnect is Ownable, ERC1155 {
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
   * @dev Creator account identified by its unique id and name
   */
  struct CreatorAccount {
    bytes32 id;
    bytes32 slug;
    string title;
    string description;
    string avatarUrl;
    string bannerUrl;
    uint8[] interests;
    Cards cards;
    uint256 obolId;
  }
  event CreatorAccountCreated(uint256 obolId);
  /**
   * @dev Creator accounts stored by address along with lookup tables by name and obol id
   */
  mapping(address => CreatorAccount) _creatorAccounts;
  mapping(bytes32 => address) _creatorAddressesById;
  mapping(bytes32 => address) _creatorAddressesBySlug;
  mapping(uint256 => address) _creatorAddressesByObolId;
  /**
   * @dev User account identified by its unique username
   */
  struct UserAccount {
    bytes32 id;
    bytes32 username;
    string avatarUrl;
    uint8[] interests;
  }
  /**
   * @dev User accounts stored by address
   */
  mapping(address => UserAccount) _userAccounts;
  // mapping(bytes32 => address) userAddressesById;
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
   * @dev Global counter incremented each time we need to generate a new token id
   */
  uint256 public globalCounter;
  /**
   * @dev One counter for each creator to keep track of individual member ids
   */
  mapping(bytes32 => uint256) _memberCounters;
  /**
   * @dev Underlying representation of a membership card
   */
  struct MembershipCard {
    bytes32 creatorAccountId;
    address userAddress;
    bytes32 tier;
    uint256 memberId;
    uint256 mintTimestamp;
    SubscriptionDuration subscriptionDuration;
    uint256 subscriptionStartTimestamp;
    uint256 subscriptionEndTimestamp;
  }
  /**
   * @dev Membership cards stored by token id
   */
  mapping(uint256 => MembershipCard) _membershipCards;
  mapping(address => uint256[]) _membershipCardsByOwner;
  /**
   * @dev Membership card token ids stored by user address and creator id
   */
  mapping(address => mapping(bytes32 => uint256)) _membershipCardsByOwnerAndCreatorAccountId;
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
  mapping(SubscriptionDuration => uint8) _subscriptionDurationInMonths;
  /**
   * @dev Membership card tiers price and rewards per second
   */
  mapping(bytes32 => uint256) _tierPrices;
  mapping(bytes32 => mapping(SubscriptionDuration => uint24)) _tierRewards;
  //
  struct Exclusivity {
    bytes32 id;
    string title;
    string description;
    string imageUrl;
    uint256 price;
    uint256 totalSupply;
    uint256 minted;
    bytes32 creatorAccountId;
    uint256 tokenId;
  }
  //
  mapping(bytes32 => Exclusivity) _exclusivities;
  //
  event ExclusivityCreated(uint256 tokenId);
  /**
   * @dev Creator outstanding payments stored by creator address
   */
  mapping(address => uint256) _payouts;
  /**
   * @dev Output of token metadata
   */
  struct MembershipCardData {
    uint256 tokenId;
    uint8 color;
    string logoUrl;
    bytes32 tier;
    uint256 memberId;
    uint256 mintTimestamp;
    uint256 subscriptionEndTimestamp;
    bytes32 username;
    string avatarUrl;
    uint256 obolBalance;
    string title;
    string description;
    bytes32 slug;
  }
  MembershipCardData defaultMembershipCardData;
  /**
   * @dev Sibling contracts addresses
   */
  StableCoin _stableCoin;
  /**
   * @dev Custom errors
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
  error InvalidUserAddressError(address userAddress);
  error InvalidAmountError();
  error InvalidTokenIdError(uint256 tokenId);
  error AlreadyMemberError();
  error InvalidTierError(bytes32 tier);
  error InvalidSubscriptionDurationError();
  error NotAMemberError(address account);
  error ActiveSubscriptionError();
  error ExclusivityAlreadyExistsError();
  error InvalidExclusivityError();
  error ExclusivitySoldOutError();

  /**
   * @dev Constructor initializing token URI, sibling contracts addresses and contract constants
   * @param uri token URI
   * @param stableCoinAddress stable coin contract address
   */
  constructor(string memory uri, address stableCoinAddress) Ownable(msg.sender) ERC1155(uri) {
    _stableCoin = StableCoin(stableCoinAddress);
    _tierPrices['standard'] = 15;
    _tierPrices['premium'] = 30;
    uint24[4] memory standardRewards = [57871, 60765, 63658, 66552];
    uint24[4] memory premiumRewards = [115741, 121528, 127315, 133102];
    uint8[4] memory months = [1, 3, 6, 12];
    for (uint i = 0; i < 4; ++i) {
      SubscriptionDuration subscriptionDuration = SubscriptionDuration(i + 1);
      _tierRewards['standard'][subscriptionDuration] = standardRewards[i];
      _tierRewards['premium'][subscriptionDuration] = premiumRewards[i];
      _subscriptionDurationInMonths[subscriptionDuration] = months[i];
    }
  }

  /**
   * @dev Modifier used to guard against updating a creator account if not the owner
   */
  modifier onlyCreator(bytes32 creatorAccountId) {
    if (_creatorAccounts[msg.sender].id != creatorAccountId) {
      revert NotCreatorError();
    }
    _;
  }
  /**
   * @dev Modifier used to guard against updating a user account if not the owner
   */
  modifier onlyUser(bytes32 userAccountId) {
    if (_userAccounts[msg.sender].id != userAccountId) {
      revert NotUserError();
    }
    _;
  }

  /**
   * @dev Creates a new creator account
   * @param creatorAccount new creator account params
   */
  function createCreatorAccount(CreatorAccount memory creatorAccount) external {
    if (
      creatorAccount.slug == 0 ||
      bytes(creatorAccount.title).length == 0 ||
      creatorAccount.interests.length == 0
    ) {
      revert InvalidCreatorAccountError();
    }
    if (_creatorAccounts[msg.sender].slug != 0) {
      revert CreatorAlreadyExistsError();
    }
    creatorAccount.obolId = ++globalCounter;
    _creatorAccounts[msg.sender] = creatorAccount;
    _creatorAddressesById[creatorAccount.id] = msg.sender;
    _creatorAddressesBySlug[creatorAccount.slug] = msg.sender;
    _creatorAddressesByObolId[creatorAccount.obolId] = msg.sender;
    emit CreatorAccountCreated(creatorAccount.obolId);
  }

  function creatorAccountById(
    bytes32 creatorAccountId
  ) internal view returns (CreatorAccount memory) {
    address creatorAddress = _creatorAddressesById[creatorAccountId];
    return _creatorAccounts[creatorAddress];
  }

  /**
   * @dev Returns a creator account by slug
   * @param creatorAccountSlug creator account slug
   * @return CreatorAccount
   */
  function creatorAccountBySlug(
    bytes32 creatorAccountSlug
  ) external view returns (CreatorAccount memory) {
    address creatorAddress = _creatorAddressesBySlug[creatorAccountSlug];
    return _creatorAccounts[creatorAddress];
  }

  /**
   * @dev Updates a creator account
   * @param creatorAccount updated creator account params
   */
  function updateCreatorAccount(
    CreatorAccount memory creatorAccount
  ) external onlyCreator(creatorAccount.id) {
    if (
      creatorAccount.slug != _creatorAccounts[msg.sender].slug ||
      creatorAccount.obolId != _creatorAccounts[msg.sender].obolId
    ) {
      revert InvalidCreatorAccountError();
    }
    _creatorAccounts[msg.sender] = creatorAccount;
  }

  /**
   * @dev Creates a new user account
   * @param userAccount new user account params
   */
  function createUserAccount(UserAccount memory userAccount) public {
    if (userAccount.username == 0 || userAccount.interests.length == 0) {
      revert InvalidUserAccountError();
    }
    if (_userAccounts[msg.sender].username != 0) {
      revert UserAlreadyExistsError();
    }
    _userAccounts[msg.sender] = userAccount;
  }

  /* function userAccountById(bytes32 userAccountId) internal view returns (UserAccount memory) {
    address userAddress = userAddressesById[userAccountId];
    return userAccounts[userAddress];
  } */

  /**
   * @dev Returns a user account by address
   * @param userAddress user address
   * @return UserAccount
   */
  function userAccountByAddress(address userAddress) public view returns (UserAccount memory) {
    return _userAccounts[userAddress];
  }

  /**
   * @dev Updates a user account
   * @param userAccount updated user account params
   */
  function updateUserAccount(UserAccount memory userAccount) external onlyUser(userAccount.id) {
    if (userAccount.username != _userAccounts[msg.sender].username) {
      revert InvalidUserAccountError();
    }
    _userAccounts[msg.sender] = userAccount;
  }

  function membershipCardsByTokenId(uint256 tokenId) external view returns (MembershipCard memory) {
    return _membershipCards[tokenId];
  }

  function membershipCardsByOwner(
    address owner
  ) external view returns (MembershipCardData[] memory) {
    uint[] memory membershipCardsTokenIds = _membershipCardsByOwner[owner];
    MembershipCardData[] memory result = new MembershipCardData[](membershipCardsTokenIds.length);
    for (uint i = 0; i < membershipCardsTokenIds.length; ++i) {
      uint membershipCardTokenId = membershipCardsTokenIds[i];
      result[i] = membershipCardData(membershipCardTokenId);
    }
    return result;
  }

  function membershipCardByOwnerAndCreatorAccountId(
    address owner,
    bytes32 creatorAccountId
  ) external view returns (MembershipCardData memory) {
    uint membershipCardTokenId = _membershipCardsByOwnerAndCreatorAccountId[owner][creatorAccountId];
    return membershipCardData(membershipCardTokenId);
  }

  /**
   * @dev Mints a new free membership card of a given creator
   * @param creatorAccountId creator account id
   */
  function mintMembershipCard(bytes32 creatorAccountId, UserAccount memory userAccount_) external {
    CreatorAccount memory creatorAccount = creatorAccountById(creatorAccountId);
    if (creatorAccount.id == 0) {
      revert InvalidCreatorAccountError();
    }
    UserAccount memory userAccount = userAccountByAddress(msg.sender);
    if (userAccount.username == 0) {
      createUserAccount(userAccount_);
      userAccount = userAccount_;
      // revert InvalidUserAddressError(msg.sender);
    }
    uint membershipCardTokenId = _membershipCardsByOwnerAndCreatorAccountId[msg.sender][
      creatorAccountId
    ];
    if (membershipCardTokenId != 0) {
      revert AlreadyMemberError();
    }
    uint memberId = ++_memberCounters[creatorAccountId];
    uint tokenId = ++globalCounter;
    _membershipCards[tokenId] = MembershipCard({
      creatorAccountId: creatorAccountId,
      userAddress: msg.sender,
      tier: 'free',
      memberId: memberId,
      mintTimestamp: block.timestamp,
      subscriptionDuration: SubscriptionDuration.None,
      subscriptionStartTimestamp: 0,
      subscriptionEndTimestamp: 0
    });
    _membershipCardsByOwnerAndCreatorAccountId[msg.sender][creatorAccountId] = tokenId;
    _mint(msg.sender, tokenId, 1, '');
  }

  /**
   * @dev Returns a creator account card tier config
   * @param creatorAccount creator account
   * @param tier card tier
   * @return CardTier
   */
  function cardTier(
    CreatorAccount memory creatorAccount,
    bytes32 tier
  ) internal pure returns (CardTier memory) {
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
   * @param tokenId token id
   * @return TokenData
   */
  /* function getMembershipCardData(
    MembershipCard memory membershipCard,
    uint tokenId
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
        tokenId: tokenId,
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
  } */

  /**
   * @dev Returns an obole token data
   * @param tokenId token id
   * @return TokenData
   */
  /* function oboleData(uint tokenId) external pure returns (OboleData memory) {
    MembershipCard memory membershipCard = membershipCards[tokenId];
    if (membershipCard.creatorName == 0) {
      //
    }
    return
      OboleData({
        tokenId: tokenId,
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
  } */

  /**
   * @dev Returns membership card data for a given token id
   * @param tokenId token id
   * @return TokenData
   */
  function membershipCardData(uint tokenId) public view returns (MembershipCardData memory) {
    MembershipCard memory membershipCard = _membershipCards[tokenId];
    if (membershipCard.creatorAccountId == 0) {
      return defaultMembershipCardData;
      // revert InvalidTokenIdError(tokenId);
    }
    CreatorAccount memory creatorAccount = creatorAccountById(membershipCard.creatorAccountId);
    CardTier memory tier = cardTier(creatorAccount, membershipCard.tier);
    UserAccount memory userAccount = _userAccounts[membershipCard.userAddress];
    uint obolBalance = balanceOf(membershipCard.userAddress, creatorAccount.obolId);
    return
      MembershipCardData({
        tokenId: tokenId,
        color: tier.color,
        logoUrl: tier.logoUrl,
        tier: membershipCard.tier,
        memberId: membershipCard.memberId,
        mintTimestamp: membershipCard.mintTimestamp,
        subscriptionEndTimestamp: membershipCard.subscriptionEndTimestamp,
        username: userAccount.username,
        avatarUrl: userAccount.avatarUrl,
        obolBalance: obolBalance,
        title: creatorAccount.title,
        description: creatorAccount.description,
        slug: creatorAccount.slug
      });
  }

  /**
   * @dev Make a donation in stable coins to a creator and receive obols in return
   * @param creatorAccountId creator account id
   * @param amount stable coin amount
   */
  function donate(bytes32 creatorAccountId, uint amount) external {
    CreatorAccount memory creatorAccount = creatorAccountById(creatorAccountId);
    if (creatorAccount.id == 0) {
      revert InvalidCreatorAccountError();
    }
    if (amount == 0) {
      revert InvalidAmountError();
    }
    address creatorAddress = _creatorAddressesById[creatorAccountId];
    _stableCoin.transferFrom(msg.sender, address(this), amount);
    _payouts[creatorAddress] += amount;
    // 1 USDC (6 decimals) = 10 OBO (9 decimals)
    _mint(msg.sender, creatorAccount.obolId, amount * 10 ** 4, '');
  }

  /**
   * @dev Subscribe to a creator paid membership to upgrade a membership card tier and receive
   * rewards in obol
   * @param creatorAccountId creator account id
   * @param tier membership card tier
   * @param subscriptionDuration duration in months
   */
  function subscribe(
    bytes32 creatorAccountId,
    bytes32 tier,
    SubscriptionDuration subscriptionDuration
  ) external {
    CreatorAccount memory creatorAccount = creatorAccountById(creatorAccountId);
    if (creatorAccount.id == 0) {
      revert InvalidCreatorAccountError();
    }
    uint price = _tierPrices[tier];
    if (price == 0) {
      revert InvalidTierError(tier);
    }
    if (subscriptionDuration == SubscriptionDuration.None) {
      revert InvalidSubscriptionDurationError();
    }
    uint tokenId = _membershipCardsByOwnerAndCreatorAccountId[msg.sender][creatorAccountId];
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    MembershipCard storage membershipCard = _membershipCards[tokenId];
    if (membershipCard.tier == tier && block.timestamp < membershipCard.subscriptionEndTimestamp) {
      revert ActiveSubscriptionError();
    }
    address creatorAddress = _creatorAddressesById[creatorAccountId];
    uint months = _subscriptionDurationInMonths[subscriptionDuration];
    uint amount = price * months * 10 ** 6;
    _stableCoin.transferFrom(msg.sender, address(this), amount);
    _payouts[creatorAddress] += amount;
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
    MembershipCard memory membershipCard = _membershipCards[tokenId];
    uint rewardsPerSecond = _tierRewards[membershipCard.tier][membershipCard.subscriptionDuration];
    uint lastTimeRewardsApplicable = Math.min(
      block.timestamp,
      membershipCard.subscriptionEndTimestamp
    );
    uint subscriptionTime = (lastTimeRewardsApplicable - membershipCard.subscriptionStartTimestamp);
    return subscriptionTime * rewardsPerSecond;
  }

  /**
   * @dev Returns rewards accumulated for a given account and creator name
   * @param userAddress user address
   * @param creatorAccountId creator account id
   * @return uint
   */
  function rewardsAmount(address userAddress, bytes32 creatorAccountId) public view returns (uint) {
    uint tokenId = _membershipCardsByOwnerAndCreatorAccountId[userAddress][creatorAccountId];
    if (tokenId == 0) {
      return 0;
      // revert NotAMemberError(userAddress);
    }
    return _rewardsAmount(tokenId);
  }

  /**
   * @dev Claim rewards accumulated by a user for a given creator name
   * @param creatorAccountId creator name
   */
  function claimRewards(bytes32 creatorAccountId) external {
    uint tokenId = _membershipCardsByOwnerAndCreatorAccountId[msg.sender][creatorAccountId];
    if (tokenId == 0) {
      revert NotAMemberError(msg.sender);
    }
    CreatorAccount memory creatorAccount = creatorAccountById(creatorAccountId);
    uint amount = _rewardsAmount(tokenId);
    MembershipCard storage membershipCard = _membershipCards[tokenId];
    uint lastTimeRewardsApplicable = Math.min(
      block.timestamp,
      membershipCard.subscriptionEndTimestamp
    );
    membershipCard.subscriptionStartTimestamp = lastTimeRewardsApplicable;
    _mint(msg.sender, creatorAccount.obolId, amount, '');
  }

  /**
   * @dev Returns a creator outstanding payment balance in stable coin
   * @param userAddress user address
   * @return uint
   */
  function payoutsAmount(address userAddress) public view returns (uint) {
    return _payouts[userAddress];
  }

  /**
   * @dev Withdraw creator payouts entirely
   */
  function withdraw() external {
    uint payout = _payouts[msg.sender];
    if (payout == 0) {
      revert InvalidAmountError();
    }
    _payouts[msg.sender] = 0;
    _stableCoin.transfer(msg.sender, payout);
  }

  function exclusivityById(bytes32 exclusivityId) external view returns (Exclusivity memory) {
    return _exclusivities[exclusivityId];
  }

  function exclusivityMintedCount(
    bytes32[] calldata exclusivityIds
  ) external view returns (uint[] memory) {
    uint[] memory result = new uint[](exclusivityIds.length);
    for (uint i = 0; i < result.length; ++i) {
      result[i] = _exclusivities[exclusivityIds[i]].minted;
    }
    return result;
  }

  function createExclusivity(Exclusivity memory exclusivity) external {
    if (_exclusivities[exclusivity.id].id != 0) {
      revert ExclusivityAlreadyExistsError();
    }
    if (
      exclusivity.id == 0 ||
      bytes(exclusivity.imageUrl).length == 0 ||
      exclusivity.minted != 0 ||
      exclusivity.tokenId != 0
    ) {
      revert InvalidExclusivityError();
    }
    CreatorAccount memory creatorAccount = _creatorAccounts[msg.sender];
    exclusivity.creatorAccountId = creatorAccount.id;
    exclusivity.tokenId = ++globalCounter;
    _exclusivities[exclusivity.id] = exclusivity;
    emit ExclusivityCreated(exclusivity.tokenId);
  }

  function deleteExclusivity(bytes32 exclusivityId) external {
    CreatorAccount memory creatorAccount = _creatorAccounts[msg.sender];
    if (_exclusivities[exclusivityId].creatorAccountId != creatorAccount.id) {
      revert InvalidExclusivityError();
    }
    delete _exclusivities[exclusivityId];
  }

  function mintExclusivity(bytes32 exclusivityId) external {
    Exclusivity storage exclusivity = _exclusivities[exclusivityId];
    if (exclusivity.id == 0) {
      revert InvalidExclusivityError();
    }
    if (exclusivity.totalSupply != 0 && exclusivity.minted == exclusivity.totalSupply) {
      revert ExclusivitySoldOutError();
    }
    _mint(msg.sender, exclusivity.tokenId, 1, '');
    ++_exclusivities[exclusivityId].minted;
  }

  fallback() external {}
}
