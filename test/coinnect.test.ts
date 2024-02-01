import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import {
  defaultCreatorAccount,
  rawCreatorAccountToCreatorAccount,
  defaultUserAccount,
  rawUserAccountToUserAccount,
  rawMembershipCardToMembershipCard,
  rawMembershipCardDataToMembershipCardData,
  getBlockTimestamp,
} from './utils';

/* it('should return an obole token data', async () => {
      const { coinnect } = await loadFixture(mintMembershipCardFixture);
      const oboleTokenId = 1;
      const tokenData = await coinnect.oboleData(oboleTokenId);
      const { name, title, description, avatarUrl } = defaultCreatorAccount();
      expect(rawTokenDataToTokenData(tokenData)).to.deep.equal({
        tokenId: oboleTokenId,
        color: 0,
        logoUrl: avatarUrl,
        tier: 0,
        memberId: 0,
        mintTimestamp: 0,
        subscriptionEndTimestamp: 0,
        username: name,
        avatarUrl,
        oboleBalance: 0,
        title,
        description,
        name,
      });
    }); */

describe('Coinnect', () => {
  const deployContractAndSetVariablesFixture = async () => {
    const stableCoin = await ethers.deployContract('StableCoin');
    await stableCoin.waitForDeployment();
    const coinnect = await ethers.deployContract('Coinnect', [
      new URL('/api/tokens/{id}.json', process.env.NEXT_PUBLIC_BASE_URL).href,
      stableCoin.target,
    ]);
    await coinnect.waitForDeployment();
    const [signer1, signer2, signer3] = await ethers.getSigners();
    await stableCoin.mint(signer1!.address, ethers.parseUnits('10000', 6));
    await stableCoin.mint(signer2!.address, ethers.parseUnits('10000', 6));
    await stableCoin.mint(signer3!.address, ethers.parseUnits('10000', 6));
    return { coinnect, stableCoin, signer1: signer1!, signer2: signer2!, signer3: signer3! };
  };
  const createAccountsFixture = async () => {
    const { coinnect, stableCoin, signer1, signer2, signer3 } = await loadFixture(
      deployContractAndSetVariablesFixture,
    );
    await coinnect.createCreatorAccount(defaultCreatorAccount());
    await coinnect.connect(signer2).createUserAccount(defaultUserAccount());
    return { coinnect, stableCoin, signer1, signer2, signer3 };
  };
  const mintMembershipCardFixture = async () => {
    const { coinnect, stableCoin, signer1, signer2, signer3 } =
      await loadFixture(createAccountsFixture);
    const { id } = defaultCreatorAccount();
    const tx = await coinnect.connect(signer2).mintMembershipCard(id, defaultUserAccount());
    const mintTimestamp = await getBlockTimestamp(tx);
    return {
      coinnect,
      stableCoin,
      signer1,
      signer2,
      signer3,
      mintTimestamp,
    };
  };
  const claimRewardsFixture = async () => {
    const { coinnect, stableCoin, signer1, signer2, signer3, mintTimestamp } =
      await loadFixture(mintMembershipCardFixture);
    await stableCoin.connect(signer2).approve(coinnect.target, ethers.parseUnits('15', 6));
    const { id } = defaultCreatorAccount();
    const tx = await coinnect
      .connect(signer2)
      .subscribe(id, ethers.encodeBytes32String('standard'), 1);
    const subscriptionStartTimestamp = await getBlockTimestamp(tx);
    return {
      coinnect,
      stableCoin,
      signer1,
      signer2,
      signer3,
      mintTimestamp,
      subscriptionStartTimestamp,
    };
  };
  describe('createCreatorAccount', () => {
    it('should revert if no creator name set', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(
        coinnect.createCreatorAccount({
          ...defaultCreatorAccount(),
          slug: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should revert if no creator title set', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(
        coinnect.createCreatorAccount({
          ...defaultCreatorAccount(),
          title: '',
        }),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should revert if no creator interests set', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(
        coinnect.createCreatorAccount({
          ...defaultCreatorAccount(),
          interests: [],
        }),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should revert if creator with the same name already exists', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      await coinnect.createCreatorAccount(defaultCreatorAccount());
      await expect(
        coinnect.createCreatorAccount(defaultCreatorAccount()),
      ).to.be.revertedWithCustomError(coinnect, 'CreatorAlreadyExistsError');
    });
    it('should create a creator account', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      const creatorAccount = defaultCreatorAccount();
      await coinnect.createCreatorAccount(creatorAccount);
      const newCreatorAccount = await coinnect.creatorAccountBySlug(creatorAccount.slug);
      expect(rawCreatorAccountToCreatorAccount(newCreatorAccount)).to.deep.equal(creatorAccount);
    });
  });
  describe('creatorAccountBySlug', () => {
    it('should return a creator account by slug', async () => {
      const { coinnect } = await loadFixture(createAccountsFixture);
      const { slug } = defaultCreatorAccount();
      const creatorAccount = await coinnect.creatorAccountBySlug(slug);
      expect(creatorAccount.slug).to.equal(slug);
    });
  });
  describe('updateCreatorAccount', () => {
    it('should revert if not called by creator', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      await expect(
        coinnect.connect(signer2).updateCreatorAccount(defaultCreatorAccount()),
      ).to.be.revertedWithCustomError(coinnect, 'NotCreatorError');
    });
    it('should revert if trying to update creator slug', async () => {
      const { coinnect } = await loadFixture(createAccountsFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.slug = ethers.encodeBytes32String('epic-rabbits2');
      await expect(coinnect.updateCreatorAccount(creatorAccount)).to.be.revertedWithCustomError(
        coinnect,
        'InvalidCreatorAccountError',
      );
    });
    it('should revert if trying to update creator obol id', async () => {
      const { coinnect } = await loadFixture(createAccountsFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.obolId = 2n;
      await expect(coinnect.updateCreatorAccount(creatorAccount)).to.be.revertedWithCustomError(
        coinnect,
        'InvalidCreatorAccountError',
      );
    });
    it('should update a creator account', async () => {
      const { coinnect } = await loadFixture(createAccountsFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.title = 'Epic Rabbits 2';
      await coinnect.updateCreatorAccount(creatorAccount);
      const updatedCreatorAccount = await coinnect.creatorAccountBySlug(creatorAccount.slug);
      expect(updatedCreatorAccount.title).to.equal('Epic Rabbits 2');
    });
  });
  describe('createUserAccount', () => {
    it('should revert if no username set', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(
        coinnect.connect(signer2).createUserAccount({
          ...defaultUserAccount(),
          username: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidUserAccountError');
    });
    it('should revert if no user interests set', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(
        coinnect.connect(signer2).createUserAccount({
          ...defaultUserAccount(),
          interests: [],
        }),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidUserAccountError');
    });
    it('should revert if user with the same username already exists', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      await coinnect.connect(signer2).createUserAccount(defaultUserAccount());
      await expect(
        coinnect.connect(signer2).createUserAccount(defaultUserAccount()),
      ).to.be.revertedWithCustomError(coinnect, 'UserAlreadyExistsError');
    });
    it('should create a user account', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const userAccount = defaultUserAccount();
      await coinnect.connect(signer2).createUserAccount(userAccount);
      const newUserAccount = await coinnect.userAccountByAddress(signer2.address);
      expect(rawUserAccountToUserAccount(newUserAccount)).to.deep.equal(userAccount);
    });
  });
  describe('userAccountByAddress', () => {
    it('should return a user account by address', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const { username } = defaultUserAccount();
      const userAccount = await coinnect.userAccountByAddress(signer2.address);
      expect(userAccount.username).to.equal(username);
    });
  });
  describe('updateUserAccount', () => {
    it('should revert if not called by user', async () => {
      const { coinnect } = await loadFixture(createAccountsFixture);
      await expect(coinnect.updateUserAccount(defaultUserAccount())).to.be.revertedWithCustomError(
        coinnect,
        'NotUserError',
      );
    });
    it('should revert if trying to update username', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const userAccount = defaultUserAccount();
      userAccount.username = ethers.encodeBytes32String('saimeunt2');
      await expect(
        coinnect.connect(signer2).updateUserAccount(userAccount),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidUserAccountError');
    });
    it('should update a user account', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const userAccount = defaultUserAccount();
      userAccount.avatarUrl = new URL(
        '/img/users/avatar2.jpg',
        process.env.NEXT_PUBLIC_BASE_URL,
      ).href;
      await coinnect.connect(signer2).updateUserAccount(userAccount);
      const updatedUserAccount = await coinnect.userAccountByAddress(signer2.address);
      expect(updatedUserAccount.avatarUrl).to.equal(
        new URL('/img/users/avatar2.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      );
    });
  });
  describe('mintMembershipCard', () => {
    it('should revert if creator id is invalid', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const id = ethers.encodeBytes32String('0');
      await expect(
        coinnect.connect(signer2).mintMembershipCard(id, defaultUserAccount()),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should create the user account if not previously created', async () => {
      const { coinnect, signer1 } = await loadFixture(createAccountsFixture);
      const { id, slug } = defaultCreatorAccount();
      const userAccount = {
        ...defaultUserAccount(),
        id: ethers.encodeBytes32String('2'),
        username: slug,
      };
      await coinnect.mintMembershipCard(id, userAccount);
      const newUserAccount = await coinnect.userAccountByAddress(signer1.address);
      expect(rawUserAccountToUserAccount(newUserAccount)).to.deep.equal(userAccount);
    });
    /* it('should revert if user address is invalid', async () => {
      const { coinnect, signer1 } = await loadFixture(createAccountsFixture);
      const { id } = defaultCreatorAccount();
      await expect(coinnect.mintMembershipCard(id))
        .to.be.revertedWithCustomError(coinnect, 'InvalidUserAddressError')
        .withArgs(signer1.address);
    }); */
    it('should revert if user is already a member', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const { id } = defaultCreatorAccount();
      await coinnect.connect(signer2).mintMembershipCard(id, defaultUserAccount());
      await expect(
        coinnect.connect(signer2).mintMembershipCard(id, defaultUserAccount()),
      ).to.be.revertedWithCustomError(coinnect, 'AlreadyMemberError');
    });
    it('should mint a membership card', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const { id } = defaultCreatorAccount();
      const expectedTokenId = 2;
      const balanceBeforeMint = await coinnect
        .connect(signer2)
        .balanceOf(signer2.address, expectedTokenId);
      const tx = await coinnect.connect(signer2).mintMembershipCard(id, defaultUserAccount());
      const mintTimestamp = await getBlockTimestamp(tx);
      const tokenId = await coinnect.globalCounter();
      expect(tokenId).to.equal(expectedTokenId);
      const rawMembershipCard = await coinnect.membershipCardsByTokenId(expectedTokenId);
      const membershipCard = rawMembershipCardToMembershipCard(rawMembershipCard);
      expect(membershipCard).to.deep.equal({
        creatorAccountId: id,
        userAddress: signer2.address,
        tier: ethers.encodeBytes32String('free'),
        memberId: 1,
        mintTimestamp,
        subscriptionDuration: 0,
        subscriptionStartTimestamp: 0,
        subscriptionEndTimestamp: 0,
      });
      const { tokenId: membershipCardTokenId } =
        await coinnect.membershipCardByOwnerAndCreatorAccountId(signer2.address, id);
      expect(membershipCardTokenId).to.equal(expectedTokenId);
      const balanceAfterMint = await coinnect
        .connect(signer2)
        .balanceOf(signer2.address, expectedTokenId);
      expect(balanceAfterMint - balanceBeforeMint).to.equal(1);
    });
  });
  describe('membershipCardData', () => {
    /* it('should revert when given an invalid token id', async () => {
      const { coinnect } = await loadFixture(mintMembershipCardFixture);
      const invalidTokenId = 0;
      await expect(coinnect.membershipCardData(invalidTokenId))
        .to.be.revertedWithCustomError(coinnect, 'InvalidTokenIdError')
        .withArgs(invalidTokenId);
    }); */
    it('should return an invalid membership card when given an invalid token id', async () => {
      const { coinnect } = await loadFixture(mintMembershipCardFixture);
      const membershipCardData = await coinnect.membershipCardData(0);
      expect(rawMembershipCardDataToMembershipCardData(membershipCardData)).to.deep.equal({
        tokenId: 0,
        color: 0,
        logoUrl: '',
        tier: 0,
        memberId: 0,
        mintTimestamp: 0,
        subscriptionEndTimestamp: 0,
        username: 0,
        avatarUrl: '',
        obolBalance: 0,
        title: '',
        description: '',
        slug: 0,
      });
    });
    it('should return a free membership card token data', async () => {
      const { coinnect, mintTimestamp } = await loadFixture(mintMembershipCardFixture);
      const membershipCardTokenId = 2;
      const {
        slug,
        title,
        description,
        cards: {
          free: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      const membershipCardData = await coinnect.membershipCardData(membershipCardTokenId);
      expect(rawMembershipCardDataToMembershipCardData(membershipCardData)).to.deep.equal({
        tokenId: membershipCardTokenId,
        color,
        logoUrl,
        tier: ethers.encodeBytes32String('free'),
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: 0,
        username,
        avatarUrl,
        obolBalance: 0,
        title,
        description,
        slug,
      });
    });
    it('should return a standard membership card token data', async () => {
      const { coinnect, stableCoin, signer2, mintTimestamp } =
        await loadFixture(mintMembershipCardFixture);
      const membershipCardTokenId = 2;
      const {
        id,
        slug,
        title,
        description,
        cards: {
          standard: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      await stableCoin.connect(signer2).approve(coinnect.target, ethers.parseUnits('15', 6));
      const tier = ethers.encodeBytes32String('standard');
      const tx = await coinnect.connect(signer2).subscribe(id, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const tokenData = await coinnect.membershipCardData(membershipCardTokenId);
      expect(rawMembershipCardDataToMembershipCardData(tokenData)).to.deep.equal({
        tokenId: membershipCardTokenId,
        color,
        logoUrl,
        tier,
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: blockTimestamp + 60 * 60 * 24 * 30,
        username,
        avatarUrl,
        obolBalance: 0,
        title,
        description,
        slug,
      });
    });
    it('should return a premium membership card token data', async () => {
      const { coinnect, stableCoin, signer2, mintTimestamp } =
        await loadFixture(mintMembershipCardFixture);
      const membershipCardTokenId = 2;
      const {
        id,
        slug,
        title,
        description,
        cards: {
          premium: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      await stableCoin.connect(signer2).approve(coinnect.target, ethers.parseUnits('30', 6));
      const tier = ethers.encodeBytes32String('premium');
      const tx = await coinnect.connect(signer2).subscribe(id, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const tokenData = await coinnect.membershipCardData(membershipCardTokenId);
      expect(rawMembershipCardDataToMembershipCardData(tokenData)).to.deep.equal({
        tokenId: membershipCardTokenId,
        color,
        logoUrl,
        tier,
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: blockTimestamp + 60 * 60 * 24 * 30,
        username,
        avatarUrl,
        obolBalance: 0,
        title,
        description,
        slug,
      });
    });
  });
  describe('donate', () => {
    it('should revert when given an invalid creator name', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const id = ethers.encodeBytes32String('0');
      await expect(
        coinnect.connect(signer2).donate(id, ethers.parseUnits('10', 6)),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should revert when given an invalid amount', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      await expect(coinnect.connect(signer2).donate(id, 0)).to.be.revertedWithCustomError(
        coinnect,
        'InvalidAmountError',
      );
    });
    it('should revert if stable coin allowance is insufficient', async () => {
      const { coinnect, stableCoin, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      const allowance = await stableCoin.allowance(signer2.address, coinnect.target);
      await expect(coinnect.connect(signer2).donate(id, ethers.parseUnits('10', 6)))
        .to.be.revertedWithCustomError(stableCoin, 'ERC20InsufficientAllowance')
        .withArgs(coinnect.target, allowance, ethers.parseUnits('10', 6));
    });
    it('should revert if stable coin balance is inferior to amount', async () => {
      const { coinnect, stableCoin, signer2 } = await loadFixture(mintMembershipCardFixture);
      const amount = ethers.parseUnits('10001', 6);
      await stableCoin.connect(signer2).approve(coinnect.target, amount);
      const { id } = defaultCreatorAccount();
      const balance = await stableCoin.balanceOf(signer2.address);
      await expect(coinnect.connect(signer2).donate(id, amount))
        .to.be.revertedWithCustomError(stableCoin, 'ERC20InsufficientBalance')
        .withArgs(signer2.address, balance, amount);
    });
    it('should donate stable coins and receive obols in exchange', async () => {
      const { coinnect, stableCoin, signer1, signer2 } =
        await loadFixture(mintMembershipCardFixture);
      const amount = ethers.parseUnits('10', 6);
      await stableCoin.connect(signer2).approve(coinnect.target, amount);
      const { id, obolId } = defaultCreatorAccount();
      const stableCoinBalanceBeforeDonate = await stableCoin.balanceOf(signer2.address);
      const payoutsBalanceBeforeDonate = await coinnect.payoutsAmount(signer1.address);
      const obolBalanceBeforeDonate = await coinnect.balanceOf(signer2.address, obolId);
      await coinnect.connect(signer2).donate(id, amount);
      const stableCoinBalanceAfterDonate = await stableCoin.balanceOf(signer2.address);
      expect(stableCoinBalanceBeforeDonate - stableCoinBalanceAfterDonate).to.equal(amount);
      const payoutsBalanceAfterDonate = await coinnect.payoutsAmount(signer1.address);
      expect(payoutsBalanceAfterDonate - payoutsBalanceBeforeDonate).to.equal(amount);
      const obolBalanceAfterDonate = await coinnect.balanceOf(signer2.address, obolId);
      expect(obolBalanceAfterDonate - obolBalanceBeforeDonate).to.equal(
        ethers.parseUnits('100', 9),
      );
    });
  });
  describe('subscribe', () => {
    it('should revert when given an invalid creator name', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const id = ethers.encodeBytes32String('0');
      await expect(
        coinnect.connect(signer2).subscribe(id, ethers.encodeBytes32String('standard'), 1),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidCreatorAccountError');
    });
    it('should revert when given an invalid tier', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('free');
      await expect(coinnect.connect(signer2).subscribe(id, tier, 1))
        .to.be.revertedWithCustomError(coinnect, 'InvalidTierError')
        .withArgs(tier);
    });
    it('should revert when given an invalid subscription duration', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      await expect(
        coinnect.connect(signer2).subscribe(id, ethers.encodeBytes32String('standard'), 0),
      ).to.be.revertedWithCustomError(coinnect, 'InvalidSubscriptionDurationError');
    });
    it('should revert when trying to subscribe if not a member', async () => {
      const { coinnect, signer2 } = await loadFixture(createAccountsFixture);
      const { id } = defaultCreatorAccount();
      await expect(
        coinnect.connect(signer2).subscribe(id, ethers.encodeBytes32String('standard'), 1),
      )
        .to.be.revertedWithCustomError(coinnect, 'NotAMemberError')
        .withArgs(signer2.address);
    });
    it('should revert when already having an active subscription', async () => {
      const { coinnect, stableCoin, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('standard');
      await stableCoin.connect(signer2).approve(coinnect.target, ethers.parseUnits('15', 6));
      await coinnect.connect(signer2).subscribe(id, tier, 1);
      await expect(coinnect.connect(signer2).subscribe(id, tier, 1)).to.be.revertedWithCustomError(
        coinnect,
        'ActiveSubscriptionError',
      );
    });
    it('should subscribe to a paid membership', async () => {
      const { coinnect, stableCoin, signer1, signer2 } =
        await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('standard');
      const amount = ethers.parseUnits('15', 6);
      await stableCoin.connect(signer2).approve(coinnect.target, amount);
      const stableCoinBalanceBeforeSubscribe = await stableCoin.balanceOf(signer2.address);
      const payoutsBalanceBeforeSubscribe = await coinnect.payoutsAmount(signer1.address);
      const tx = await coinnect.connect(signer2).subscribe(id, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const stableCoinBalanceAfterSubscribe = await stableCoin.balanceOf(signer2.address);
      expect(stableCoinBalanceBeforeSubscribe - stableCoinBalanceAfterSubscribe).to.equal(amount);
      const payoutsBalanceAfterSubscribe = await coinnect.payoutsAmount(signer1.address);
      expect(payoutsBalanceAfterSubscribe - payoutsBalanceBeforeSubscribe).to.equal(amount);
      const rawMembershipCard = await coinnect.membershipCardsByTokenId(2);
      const membershipCard = rawMembershipCardToMembershipCard(rawMembershipCard);
      expect(membershipCard).to.deep.equal({
        ...membershipCard,
        tier,
        subscriptionDuration: 1,
        subscriptionStartTimestamp: blockTimestamp,
        subscriptionEndTimestamp: blockTimestamp + 60 * 60 * 24 * 30,
      });
    });
  });
  describe('rewardsAmount', () => {
    /* it('should revert if not a member', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const { id } = defaultCreatorAccount();
      await expect(coinnect.rewardsAmount(signer2.address, id)).to.be.revertedWithCustomError(
        coinnect,
        'NotAMemberError',
      );
    }); */
    it('should return 0 if no active subscription', async () => {
      const { coinnect, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { id } = defaultCreatorAccount();
      const rewardsAmount = await coinnect.rewardsAmount(signer2.address, id);
      expect(rewardsAmount).to.equal(0);
    });
    it('should return the current rewards amount', async () => {
      const { coinnect, signer2, subscriptionStartTimestamp } =
        await loadFixture(claimRewardsFixture);
      const oneDayInSeconds = 60 * 60 * 24;
      await time.increaseTo(subscriptionStartTimestamp + oneDayInSeconds);
      const { id } = defaultCreatorAccount();
      const rewardsAmount = await coinnect.rewardsAmount(signer2.address, id);
      const rewardsPerSecond = 57871;
      expect(rewardsAmount).to.equal(oneDayInSeconds * rewardsPerSecond);
    });
    it('should return the max rewards amount after subscription ended', async () => {
      const { coinnect, signer2, subscriptionStartTimestamp } =
        await loadFixture(claimRewardsFixture);
      const oneMonthInSeconds = 60 * 60 * 24 * 30;
      await time.increaseTo(subscriptionStartTimestamp + oneMonthInSeconds * 2);
      const { id } = defaultCreatorAccount();
      const rewardsAmount = await coinnect.rewardsAmount(signer2.address, id);
      const rewardsPerSecond = 57871;
      expect(rewardsAmount).to.equal(oneMonthInSeconds * rewardsPerSecond);
    });
  });
  describe('claimRewards', () => {
    it('should revert if not a member', async () => {
      const { coinnect, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const { id } = defaultCreatorAccount();
      await expect(coinnect.connect(signer2).claimRewards(id)).to.be.revertedWithCustomError(
        coinnect,
        'NotAMemberError',
      );
    });
    it('should claim rewards', async () => {
      const { coinnect, signer2, subscriptionStartTimestamp } =
        await loadFixture(claimRewardsFixture);
      const { id, obolId } = defaultCreatorAccount();
      const obolBalanceBeforeClaim = await coinnect.balanceOf(signer2.address, obolId);
      const oneDayInSeconds = 60 * 60 * 24;
      await time.increaseTo(subscriptionStartTimestamp + oneDayInSeconds);
      const tx = await coinnect.connect(signer2).claimRewards(id);
      const blockTimestamp = await getBlockTimestamp(tx);
      const obolBalanceAfterClaim = await coinnect.balanceOf(signer2.address, obolId);
      const rewardsPerSecond = 57871;
      const rewardsAmount = (oneDayInSeconds + 1) * rewardsPerSecond;
      expect(obolBalanceAfterClaim - obolBalanceBeforeClaim).to.equal(rewardsAmount);
      const rawMembershipCard = await coinnect.membershipCardsByTokenId(2);
      const membershipCard = rawMembershipCardToMembershipCard(rawMembershipCard);
      expect(membershipCard).to.deep.equal({
        ...membershipCard,
        subscriptionStartTimestamp: blockTimestamp,
      });
    });
  });
  describe('withdraw', () => {
    it('should revert if there is nothing to withdraw', async () => {
      const { coinnect } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(coinnect.withdraw()).to.be.revertedWithCustomError(
        coinnect,
        'InvalidAmountError',
      );
    });
    it('should withdraw outstanding payment', async () => {
      const { coinnect, stableCoin, signer1 } = await loadFixture(claimRewardsFixture);
      const stableCoinBalanceBeforeWithdraw = await stableCoin.balanceOf(signer1.address);
      await coinnect.withdraw();
      const stableCoinBalanceAfterWithdraw = await stableCoin.balanceOf(signer1.address);
      expect(stableCoinBalanceAfterWithdraw - stableCoinBalanceBeforeWithdraw).to.equal(
        ethers.parseUnits('15', 6),
      );
    });
  });
});
