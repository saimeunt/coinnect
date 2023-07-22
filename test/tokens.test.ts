import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import {
  baseUrl,
  defaultCreatorAccount,
  defaultUserAccount,
  rawMembershipCardToMembershipCard,
  rawTokenDataToTokenData,
  getBlockTimestamp,
} from './utils';

describe('Tokens', () => {
  const deployContractAndSetVariablesFixture = async () => {
    const stableCoin = await ethers.deployContract('StableCoin');
    await stableCoin.waitForDeployment();
    const accounts = await ethers.deployContract('Accounts');
    await accounts.waitForDeployment();
    const tokens = await ethers.deployContract('Tokens', [
      `${baseUrl()}/api/tokens/{id}.json`,
      stableCoin.target,
      accounts.target,
    ]);
    await tokens.waitForDeployment();
    await accounts.setTokens(tokens.target);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    await stableCoin.mint(signer1.address, ethers.parseUnits('10000', 6));
    await stableCoin.mint(signer2.address, ethers.parseUnits('10000', 6));
    await stableCoin.mint(signer3.address, ethers.parseUnits('10000', 6));
    return { tokens, accounts, stableCoin, signer1, signer2, signer3 };
  };
  const mintMembershipCardFixture = async () => {
    const { tokens, accounts, stableCoin, signer1, signer2, signer3 } = await loadFixture(
      deployContractAndSetVariablesFixture,
    );
    await accounts.createCreatorAccount(defaultCreatorAccount());
    await accounts.connect(signer2).createUserAccount(defaultUserAccount());
    return { tokens, accounts, stableCoin, signer1, signer2, signer3 };
  };
  const getTokenDataFixture = async () => {
    const { tokens, accounts, stableCoin, signer1, signer2, signer3 } = await loadFixture(
      mintMembershipCardFixture,
    );
    const { name } = defaultCreatorAccount();
    const tx = await tokens.connect(signer2).mintMembershipCard(name);
    const mintTimestamp = await getBlockTimestamp(tx);
    return {
      tokens,
      accounts,
      stableCoin,
      signer1,
      signer2,
      signer3,
      mintTimestamp,
    };
  };
  const claimRewardsFixture = async () => {
    const { tokens, accounts, stableCoin, signer1, signer2, signer3, mintTimestamp } =
      await loadFixture(getTokenDataFixture);
    await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('15', 6));
    const { name } = defaultCreatorAccount();
    const tx = await tokens
      .connect(signer2)
      .subscribe(name, ethers.encodeBytes32String('standard'), 1);
    const subscriptionStartTimestamp = await getBlockTimestamp(tx);
    return {
      tokens,
      accounts,
      stableCoin,
      signer1,
      signer2,
      signer3,
      mintTimestamp,
      subscriptionStartTimestamp,
    };
  };
  describe('getCreatorOboleId', () => {
    it('should revert if not called by Accounts', async () => {
      const { tokens } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(tokens.getCreatorOboleId()).to.be.revertedWithCustomError(
        tokens,
        'NotAccountsError',
      );
    });
  });
  describe('mintMembershipCard', () => {
    it('should revert if creator name is invalid', async () => {
      const { tokens, signer2 } = await loadFixture(mintMembershipCardFixture);
      const name = ethers.encodeBytes32String('epic-rabbits2');
      await expect(tokens.connect(signer2).mintMembershipCard(name))
        .to.be.revertedWithCustomError(tokens, 'InvalidCreatorNameError')
        .withArgs(name);
    });
    it('should revert if user address is invalid', async () => {
      const { tokens } = await loadFixture(mintMembershipCardFixture);
      const { name } = defaultCreatorAccount();
      await expect(tokens.mintMembershipCard(name)).to.be.revertedWithCustomError(
        tokens,
        'InvalidUserAddressError',
      );
    });
    it('should revert if user is already a member', async () => {
      const { tokens, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { name } = defaultCreatorAccount();
      await tokens.connect(signer2).mintMembershipCard(name);
      await expect(tokens.connect(signer2).mintMembershipCard(name)).to.be.revertedWithCustomError(
        tokens,
        'AlreadyMemberError',
      );
    });
    it('should mint a membership card', async () => {
      const { tokens, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { name } = defaultCreatorAccount();
      const expectedTokenId = 2;
      const balanceBeforeMint = await tokens
        .connect(signer2)
        .balanceOf(signer2.address, expectedTokenId);
      const tx = await tokens.connect(signer2).mintMembershipCard(name);
      const mintTimestamp = await getBlockTimestamp(tx);
      const tokenId = await tokens.globalCounter();
      expect(tokenId).to.equal(expectedTokenId);
      const rawMembershipCard = await tokens.membershipCards(expectedTokenId);
      const membershipCard = rawMembershipCardToMembershipCard(rawMembershipCard);
      expect(membershipCard).to.deep.equal({
        creatorName: name,
        userAddress: signer2.address,
        tier: ethers.encodeBytes32String('free'),
        memberId: 1,
        mintTimestamp,
        subscriptionDuration: 0,
        subscriptionStartTimestamp: 0,
        subscriptionEndTimestamp: 0,
      });
      const membershipCardTokenId = await tokens.membershipCardsByOwner(signer2.address, name);
      expect(membershipCardTokenId).to.equal(expectedTokenId);
      const balanceAfterMint = await tokens
        .connect(signer2)
        .balanceOf(signer2.address, expectedTokenId);
      expect(balanceAfterMint - balanceBeforeMint).to.equal(1);
    });
  });
  describe('getTokenData', () => {
    it('should revert when given an invalid token id', async () => {
      const { tokens } = await loadFixture(getTokenDataFixture);
      const invalidTokenId = 0;
      await expect(tokens.getTokenData(invalidTokenId))
        .to.be.revertedWithCustomError(tokens, 'InvalidTokenIdError')
        .withArgs(invalidTokenId);
    });
    it('should return an obole token data', async () => {
      const { tokens } = await loadFixture(getTokenDataFixture);
      const oboleTokenId = 1;
      const tokenData = await tokens.getTokenData(oboleTokenId);
      const { name, title, description, avatarUrl } = defaultCreatorAccount();
      expect(rawTokenDataToTokenData(tokenData)).to.deep.equal({
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
    });
    it('should return a free membership card token data', async () => {
      const { tokens, mintTimestamp } = await loadFixture(getTokenDataFixture);
      const membershipCardTokenId = 2;
      const {
        name,
        title,
        description,
        cards: {
          free: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      const tokenData = await tokens.getTokenData(membershipCardTokenId);
      expect(rawTokenDataToTokenData(tokenData)).to.deep.equal({
        color,
        logoUrl,
        tier: ethers.encodeBytes32String('free'),
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: 0,
        username,
        avatarUrl,
        oboleBalance: 0,
        title,
        description,
        name,
      });
    });
    it('should return a standard membership card token data', async () => {
      const { tokens, stableCoin, signer2, mintTimestamp } = await loadFixture(getTokenDataFixture);
      const membershipCardTokenId = 2;
      const {
        name,
        title,
        description,
        cards: {
          standard: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('15', 6));
      const tier = ethers.encodeBytes32String('standard');
      const tx = await tokens.connect(signer2).subscribe(name, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const tokenData = await tokens.getTokenData(membershipCardTokenId);
      expect(rawTokenDataToTokenData(tokenData)).to.deep.equal({
        color,
        logoUrl,
        tier,
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: blockTimestamp + 60 * 60 * 24 * 30,
        username,
        avatarUrl,
        oboleBalance: 0,
        title,
        description,
        name,
      });
    });
    it('should return a premium membership card token data', async () => {
      const { tokens, stableCoin, signer2, mintTimestamp } = await loadFixture(getTokenDataFixture);
      const membershipCardTokenId = 2;
      const {
        name,
        title,
        description,
        cards: {
          premium: { color, logoUrl },
        },
      } = defaultCreatorAccount();
      const { username, avatarUrl } = defaultUserAccount();
      await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('30', 6));
      const tier = ethers.encodeBytes32String('premium');
      const tx = await tokens.connect(signer2).subscribe(name, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const tokenData = await tokens.getTokenData(membershipCardTokenId);
      expect(rawTokenDataToTokenData(tokenData)).to.deep.equal({
        color,
        logoUrl,
        tier,
        memberId: 1,
        mintTimestamp,
        subscriptionEndTimestamp: blockTimestamp + 60 * 60 * 24 * 30,
        username,
        avatarUrl,
        oboleBalance: 0,
        title,
        description,
        name,
      });
    });
  });
  describe('donate', () => {
    it('should revert when given an invalid creator name', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const name = ethers.encodeBytes32String('epic-rabbits2');
      await expect(tokens.connect(signer2).donate(name, ethers.parseUnits('10', 6)))
        .to.be.revertedWithCustomError(tokens, 'InvalidCreatorNameError')
        .withArgs(name);
    });
    it('should revert when given an invalid amount', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      await expect(tokens.connect(signer2).donate(name, 0)).to.be.revertedWithCustomError(
        tokens,
        'InvalidAmountError',
      );
    });
    it('should revert if stable coin allowance is insufficient', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      await expect(
        tokens.connect(signer2).donate(name, ethers.parseUnits('10', 6)),
      ).to.be.revertedWith('ERC20: insufficient allowance');
    });
    it('should revert if stable coin balance is inferior to amount', async () => {
      const { tokens, stableCoin, signer2 } = await loadFixture(getTokenDataFixture);
      const amount = ethers.parseUnits('10001', 6);
      await stableCoin.connect(signer2).approve(tokens.target, amount);
      const { name } = defaultCreatorAccount();
      await expect(tokens.connect(signer2).donate(name, amount)).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance',
      );
    });
    it('should donate stable coins and receive oboles in exchange', async () => {
      const { tokens, stableCoin, signer1, signer2 } = await loadFixture(getTokenDataFixture);
      const amount = ethers.parseUnits('10', 6);
      await stableCoin.connect(signer2).approve(tokens.target, amount);
      const { name, oboleId } = defaultCreatorAccount();
      const stableCoinBalanceBeforeDonate = await stableCoin.balanceOf(signer2.address);
      const payoutsBalanceBeforeDonate = await tokens.payoutsAmount(signer1.address);
      const oboleBalanceBeforeDonate = await tokens.balanceOf(signer2.address, oboleId);
      await tokens.connect(signer2).donate(name, amount);
      const stableCoinBalanceAfterDonate = await stableCoin.balanceOf(signer2.address);
      expect(stableCoinBalanceBeforeDonate - stableCoinBalanceAfterDonate).to.equal(amount);
      const payoutsBalanceAfterDonate = await tokens.payoutsAmount(signer1.address);
      expect(payoutsBalanceAfterDonate - payoutsBalanceBeforeDonate).to.equal(amount);
      const oboleBalanceAfterDonate = await tokens.balanceOf(signer2.address, oboleId);
      expect(oboleBalanceAfterDonate - oboleBalanceBeforeDonate).to.equal(
        ethers.parseUnits('100', 9),
      );
    });
  });
  describe('subscribe', () => {
    it('should revert when given an invalid creator name', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const name = ethers.encodeBytes32String('epic-rabbits2');
      await expect(
        tokens.connect(signer2).subscribe(name, ethers.encodeBytes32String('standard'), 1),
      )
        .to.be.revertedWithCustomError(tokens, 'InvalidCreatorNameError')
        .withArgs(name);
    });
    it('should revert when given an invalid tier', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('free');
      await expect(tokens.connect(signer2).subscribe(name, tier, 1))
        .to.be.revertedWithCustomError(tokens, 'InvalidTierError')
        .withArgs(tier);
    });
    it('should revert when given an invalid subscription duration', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      await expect(
        tokens.connect(signer2).subscribe(name, ethers.encodeBytes32String('standard'), 0),
      ).to.be.revertedWithCustomError(tokens, 'InvalidSubscriptionDurationError');
    });
    it('should revert when trying to subscribe if not a member', async () => {
      const { tokens, signer2 } = await loadFixture(mintMembershipCardFixture);
      const { name } = defaultCreatorAccount();
      await expect(
        tokens.connect(signer2).subscribe(name, ethers.encodeBytes32String('standard'), 1),
      ).to.be.revertedWithCustomError(tokens, 'NotAMemberError');
    });
    it('should revert when already having an active subscription', async () => {
      const { tokens, stableCoin, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('standard');
      await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('15', 6));
      await tokens.connect(signer2).subscribe(name, tier, 1);
      await expect(tokens.connect(signer2).subscribe(name, tier, 1)).to.be.revertedWithCustomError(
        tokens,
        'ActiveSubscriptionError',
      );
    });
    it('should subscribe to a paid membership', async () => {
      const { tokens, stableCoin, signer1, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      const tier = ethers.encodeBytes32String('standard');
      const amount = ethers.parseUnits('15', 6);
      await stableCoin.connect(signer2).approve(tokens.target, amount);
      const stableCoinBalanceBeforeSubscribe = await stableCoin.balanceOf(signer2.address);
      const payoutsBalanceBeforeSubscribe = await tokens.payoutsAmount(signer1.address);
      const tx = await tokens.connect(signer2).subscribe(name, tier, 1);
      const blockTimestamp = await getBlockTimestamp(tx);
      const stableCoinBalanceAfterSubscribe = await stableCoin.balanceOf(signer2.address);
      expect(stableCoinBalanceBeforeSubscribe - stableCoinBalanceAfterSubscribe).to.equal(amount);
      const payoutsBalanceAfterSubscribe = await tokens.payoutsAmount(signer1.address);
      expect(payoutsBalanceAfterSubscribe - payoutsBalanceBeforeSubscribe).to.equal(amount);
      const rawMembershipCard = await tokens.membershipCards(2);
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
    it('should revert if not a member', async () => {
      const { tokens, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const { name } = defaultCreatorAccount();
      await expect(tokens.rewardsAmount(signer2.address, name)).to.be.revertedWithCustomError(
        tokens,
        'NotAMemberError',
      );
    });
    it('should return 0 if no active subscription', async () => {
      const { tokens, signer2 } = await loadFixture(getTokenDataFixture);
      const { name } = defaultCreatorAccount();
      const rewardsAmount = await tokens.rewardsAmount(signer2.address, name);
      expect(rewardsAmount).to.equal(0);
    });
    it('should return the current rewards amount', async () => {
      const { tokens, signer2, subscriptionStartTimestamp } = await loadFixture(
        claimRewardsFixture,
      );
      const oneDayInSeconds = 60 * 60 * 24;
      await time.increaseTo(subscriptionStartTimestamp + oneDayInSeconds);
      const { name } = defaultCreatorAccount();
      const rewardsAmount = await tokens.rewardsAmount(signer2.address, name);
      const rewardsPerSecond = 57871;
      expect(rewardsAmount).to.equal(oneDayInSeconds * rewardsPerSecond);
    });
    it('should return the max rewards amount after subscription ended', async () => {
      const { tokens, signer2, subscriptionStartTimestamp } = await loadFixture(
        claimRewardsFixture,
      );
      const oneMonthInSeconds = 60 * 60 * 24 * 30;
      await time.increaseTo(subscriptionStartTimestamp + oneMonthInSeconds * 2);
      const { name } = defaultCreatorAccount();
      const rewardsAmount = await tokens.rewardsAmount(signer2.address, name);
      const rewardsPerSecond = 57871;
      expect(rewardsAmount).to.equal(oneMonthInSeconds * rewardsPerSecond);
    });
  });
  describe('claimRewards', () => {
    it('should revert if not a member', async () => {
      const { tokens, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const { name } = defaultCreatorAccount();
      await expect(tokens.connect(signer2).claimRewards(name)).to.be.revertedWithCustomError(
        tokens,
        'NotAMemberError',
      );
    });
    it('should claim rewards', async () => {
      const { tokens, signer2, subscriptionStartTimestamp } = await loadFixture(
        claimRewardsFixture,
      );
      const { name, oboleId } = defaultCreatorAccount();
      const oboleBalanceBeforeClaim = await tokens.balanceOf(signer2.address, oboleId);
      const oneDayInSeconds = 60 * 60 * 24;
      await time.increaseTo(subscriptionStartTimestamp + oneDayInSeconds);
      const tx = await tokens.connect(signer2).claimRewards(name);
      const blockTimestamp = await getBlockTimestamp(tx);
      const oboleBalanceAfterClaim = await tokens.balanceOf(signer2.address, oboleId);
      const rewardsPerSecond = 57871;
      const rewardsAmount = (oneDayInSeconds + 1) * rewardsPerSecond;
      expect(oboleBalanceAfterClaim - oboleBalanceBeforeClaim).to.equal(rewardsAmount);
      const rawMembershipCard = await tokens.membershipCards(2);
      const membershipCard = rawMembershipCardToMembershipCard(rawMembershipCard);
      expect(membershipCard).to.deep.equal({
        ...membershipCard,
        subscriptionStartTimestamp: blockTimestamp,
      });
    });
  });
  describe('withdraw', () => {
    it('should revert if there is nothing to withdraw', async () => {
      const { tokens } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(tokens.withdraw()).to.be.revertedWithCustomError(tokens, 'InvalidAmountError');
    });
    it('should withdraw outstanding payment', async () => {
      const { tokens, stableCoin, signer1 } = await loadFixture(claimRewardsFixture);
      const stableCoinBalanceBeforeWithdraw = await stableCoin.balanceOf(signer1.address);
      await tokens.withdraw();
      const stableCoinBalanceAfterWithdraw = await stableCoin.balanceOf(signer1.address);
      expect(stableCoinBalanceAfterWithdraw - stableCoinBalanceBeforeWithdraw).to.equal(
        ethers.parseUnits('15', 6),
      );
    });
  });
});
