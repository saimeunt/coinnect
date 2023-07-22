import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import {
  baseUrl,
  defaultCreatorAccount,
  rawCreatorAccountToCreatorAccount,
  defaultUserAccount,
  rawUserAccountToUserAccount,
  userId1Raw,
  userId2Raw,
} from './utils';

describe('Accounts', () => {
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
    const [signer1, signer2, signer3] = await ethers.getSigners();
    return { accounts, tokens, signer1, signer2, signer3 };
  };
  const setTokensFixture = async () => {
    const { accounts, tokens, signer1, signer2, signer3 } = await loadFixture(
      deployContractAndSetVariablesFixture,
    );
    await accounts.setTokens(tokens.target);
    return { accounts, tokens, signer1, signer2, signer3 };
  };
  const createCreatorAccountFixture = async () => {
    const { accounts, tokens, signer1, signer2, signer3 } = await loadFixture(setTokensFixture);
    await accounts.createCreatorAccount(defaultCreatorAccount());
    return { accounts, tokens, signer1, signer2, signer3 };
  };
  const createUserAccountFixture = async () => {
    const { accounts, tokens, signer1, signer2, signer3 } = await loadFixture(setTokensFixture);
    await accounts.connect(signer2).createUserAccount(defaultUserAccount());
    return { accounts, tokens, signer1, signer2, signer3 };
  };
  describe('setTokens', () => {
    it('should revert if not called by owner', async () => {
      const { accounts, tokens, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(accounts.connect(signer2).setTokens(tokens.target)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
    it('should set the tokens contract address', async () => {
      const { accounts, tokens } = await loadFixture(deployContractAndSetVariablesFixture);
      await accounts.setTokens(tokens.target);
      const tokensAddress = await accounts.tokens();
      expect(tokensAddress).to.equal(tokens.target);
    });
  });
  describe('createCreatorAccount', () => {
    it('should revert if no creator name set', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      await expect(
        accounts.createCreatorAccount({
          ...defaultCreatorAccount(),
          name: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidCreatorAccountError');
    });
    it('should revert if no creator title set', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      await expect(
        accounts.createCreatorAccount({
          ...defaultCreatorAccount(),
          title: '',
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidCreatorAccountError');
    });
    it('should revert if no creator interests set', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      await expect(
        accounts.createCreatorAccount({
          ...defaultCreatorAccount(),
          interests: [],
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidCreatorAccountError');
    });
    it('should revert if no creator user id set', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      await expect(
        accounts.createCreatorAccount({
          ...defaultCreatorAccount(),
          userId: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidCreatorAccountError');
    });
    it('should revert if creator with the same name already exists', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      await accounts.createCreatorAccount(defaultCreatorAccount());
      await expect(
        accounts.createCreatorAccount(defaultCreatorAccount()),
      ).to.be.revertedWithCustomError(accounts, 'CreatorAlreadyExistsError');
    });
    it('should create a creator account', async () => {
      const { accounts } = await loadFixture(setTokensFixture);
      const creatorAccount = defaultCreatorAccount();
      await accounts.createCreatorAccount(creatorAccount);
      const newCreatorAccount = await accounts.getCreatorAccountByName(creatorAccount.name);
      expect(rawCreatorAccountToCreatorAccount(newCreatorAccount)).to.deep.equal(creatorAccount);
    });
  });
  describe('getCreatorAccountByName', () => {
    it('should return a creator account by name', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const { name } = defaultCreatorAccount();
      const creatorAccount = await accounts.getCreatorAccountByName(name);
      expect(creatorAccount.name).to.equal(name);
    });
  });
  describe('getCreatorAccountByOboleId', () => {
    it('should return a creator account by obole id', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const { oboleId } = defaultCreatorAccount();
      const creatorAccount = await accounts.getCreatorAccountByOboleId(oboleId);
      expect(creatorAccount.oboleId).to.equal(oboleId);
    });
  });
  describe('getCreatorAddressByName', () => {
    it('should return a creator address by name', async () => {
      const { accounts, signer1 } = await loadFixture(createCreatorAccountFixture);
      const { name } = defaultCreatorAccount();
      const creatorAddress = await accounts.getCreatorAddressByName(name);
      expect(creatorAddress).to.equal(signer1.address);
    });
  });
  describe('updateCreatorAccount', () => {
    it('should revert if not called by creator', async () => {
      const { accounts, signer2 } = await loadFixture(createCreatorAccountFixture);
      await expect(
        accounts.connect(signer2).updateCreatorAccount(defaultCreatorAccount()),
      ).to.be.revertedWithCustomError(accounts, 'NotCreatorError');
    });
    it('should revert if trying to update creator name', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.name = ethers.encodeBytes32String('epic-rabbits2');
      await expect(accounts.updateCreatorAccount(creatorAccount)).to.be.revertedWithCustomError(
        accounts,
        'InvalidCreatorAccountError',
      );
    });
    it('should revert if trying to update creator obole id', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.oboleId = BigInt(2);
      await expect(accounts.updateCreatorAccount(creatorAccount)).to.be.revertedWithCustomError(
        accounts,
        'InvalidCreatorAccountError',
      );
    });
    it('should revert if trying to update creator user id', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.userId = ethers.encodeBytes32String(userId2Raw);
      await expect(accounts.updateCreatorAccount(creatorAccount)).to.be.revertedWithCustomError(
        accounts,
        'InvalidCreatorAccountError',
      );
    });
    it('should update a creator account', async () => {
      const { accounts } = await loadFixture(createCreatorAccountFixture);
      const creatorAccount = defaultCreatorAccount();
      creatorAccount.title = 'Epic Rabbits 2';
      await accounts.updateCreatorAccount(creatorAccount);
      const updatedCreatorAccount = await accounts.getCreatorAccountByName(creatorAccount.name);
      expect(updatedCreatorAccount.title).to.equal('Epic Rabbits 2');
    });
  });
  describe('createUserAccount', () => {
    it('should revert if no username set', async () => {
      const { accounts, signer2 } = await loadFixture(setTokensFixture);
      await expect(
        accounts.connect(signer2).createUserAccount({
          ...defaultUserAccount(),
          username: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidUserAccountError');
    });
    it('should revert if no user interests set', async () => {
      const { accounts, signer2 } = await loadFixture(setTokensFixture);
      await expect(
        accounts.connect(signer2).createUserAccount({
          ...defaultUserAccount(),
          interests: [],
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidUserAccountError');
    });
    it('should revert if no user id set', async () => {
      const { accounts, signer2 } = await loadFixture(setTokensFixture);
      await expect(
        accounts.connect(signer2).createUserAccount({
          ...defaultUserAccount(),
          userId: ethers.encodeBytes32String(''),
        }),
      ).to.be.revertedWithCustomError(accounts, 'InvalidUserAccountError');
    });
    it('should revert if user with the same username already exists', async () => {
      const { accounts, signer2 } = await loadFixture(setTokensFixture);
      await accounts.connect(signer2).createUserAccount(defaultUserAccount());
      await expect(
        accounts.connect(signer2).createUserAccount(defaultUserAccount()),
      ).to.be.revertedWithCustomError(accounts, 'UserAlreadyExistsError');
    });
    it('should create a user account', async () => {
      const { accounts, signer2 } = await loadFixture(setTokensFixture);
      const userAccount = defaultUserAccount();
      await accounts.connect(signer2).createUserAccount(userAccount);
      const newUserAccount = await accounts.getUserAccountByAddress(signer2.address);
      expect(rawUserAccountToUserAccount(newUserAccount)).to.deep.equal(userAccount);
    });
  });
  describe('getUserAccountByAddress', () => {
    it('should return a user account by address', async () => {
      const { accounts, signer2 } = await loadFixture(createUserAccountFixture);
      const { username } = defaultUserAccount();
      const userAccount = await accounts.getUserAccountByAddress(signer2.address);
      expect(userAccount.username).to.equal(username);
    });
  });
  describe('updateUserAccount', () => {
    it('should revert if not called by user', async () => {
      const { accounts } = await loadFixture(createUserAccountFixture);
      await expect(accounts.updateUserAccount(defaultUserAccount())).to.be.revertedWithCustomError(
        accounts,
        'NotUserError',
      );
    });
    it('should revert if trying to update username', async () => {
      const { accounts, signer2 } = await loadFixture(createUserAccountFixture);
      const userAccount = defaultUserAccount();
      userAccount.username = ethers.encodeBytes32String('saimeunt2');
      await expect(
        accounts.connect(signer2).updateUserAccount(userAccount),
      ).to.be.revertedWithCustomError(accounts, 'InvalidUserAccountError');
    });
    it('should revert if trying to update user id', async () => {
      const { accounts, signer2 } = await loadFixture(createUserAccountFixture);
      const userAccount = defaultUserAccount();
      userAccount.userId = ethers.encodeBytes32String(userId1Raw);
      await expect(
        accounts.connect(signer2).updateUserAccount(userAccount),
      ).to.be.revertedWithCustomError(accounts, 'InvalidUserAccountError');
    });
    it('should update a user account', async () => {
      const { accounts, signer2 } = await loadFixture(createUserAccountFixture);
      const userAccount = defaultUserAccount();
      userAccount.avatarUrl = new URL('/img/users/avatar2.jpg', baseUrl()).href;
      await accounts.connect(signer2).updateUserAccount(userAccount);
      const updatedUserAccount = await accounts.getUserAccountByAddress(signer2.address);
      expect(updatedUserAccount.avatarUrl).to.equal(
        new URL('/img/users/avatar2.jpg', baseUrl()).href,
      );
    });
  });
});
