import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StableCoin', () => {
  const deployContractAndSetVariablesFixture = async () => {
    const stableCoin = await ethers.deployContract('StableCoin');
    await stableCoin.waitForDeployment();
    const [signer1, signer2] = await ethers.getSigners();
    return { stableCoin, signer1: signer1!, signer2: signer2! };
  };
  describe('decimals', () => {
    it('should return 6', async () => {
      const { stableCoin } = await loadFixture(deployContractAndSetVariablesFixture);
      expect(await stableCoin.decimals()).to.equal(6n);
    });
  });
  describe('mint', () => {
    it('should revert if not called by owner', async () => {
      const { stableCoin, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      await expect(stableCoin.connect(signer2).mint(signer2.address, ethers.parseUnits('10000', 6)))
        .to.be.revertedWithCustomError(stableCoin, 'OwnableUnauthorizedAccount')
        .withArgs(signer2.address);
    });
    it('should mint ERC20 tokens to owner', async () => {
      const { stableCoin, signer1 } = await loadFixture(deployContractAndSetVariablesFixture);
      const balanceBeforeMint = await stableCoin.balanceOf(signer1.address);
      const amount = ethers.parseUnits('10000', 6);
      await stableCoin.mint(signer1.address, amount);
      const balanceAfterMint = await stableCoin.balanceOf(signer1.address);
      expect(balanceAfterMint - balanceBeforeMint).to.equal(amount);
    });
    it('should mint ERC20 tokens to a given address', async () => {
      const { stableCoin, signer2 } = await loadFixture(deployContractAndSetVariablesFixture);
      const balanceBeforeMint = await stableCoin.balanceOf(signer2.address);
      const amount = ethers.parseUnits('10000', 6);
      await stableCoin.mint(signer2.address, amount);
      const balanceAfterMint = await stableCoin.balanceOf(signer2.address);
      expect(balanceAfterMint - balanceBeforeMint).to.equal(amount);
    });
  });
});
