import { ethers } from 'hardhat';
import { stringToHex } from 'viem';

import {
  rawCreatorAccountToCreatorAccount,
  rawUserAccountToUserAccount,
  baseUrl,
} from '../lib/utils';

async function main() {
  // deploy contracts
  const stableCoin = await ethers.deployContract('StableCoin');
  await stableCoin.waitForDeployment();
  console.log(`StableCoin successfully deployed to ${stableCoin.target}`);
  const accounts = await ethers.deployContract('Accounts');
  await accounts.waitForDeployment();
  console.log(`Accounts successfully deployed to ${accounts.target}`);
  const tokens = await ethers.deployContract('Tokens', [accounts.target]);
  await tokens.waitForDeployment();
  console.log(`Tokens successfully deployed to ${tokens.target}`);
  await accounts.setTokens(tokens.target);
  //
  const [signer1, signer2, signer3] = await ethers.getSigners();
  stableCoin.mint(signer1, 1000);
  stableCoin.mint(signer2, 1000);
  stableCoin.mint(signer3, 1000);
  //
  const name = stringToHex('tribe-diamond', { size: 32 });
  const rawCreatorAccount = {
    name,
    title: 'Tribe Diamond',
    description:
      'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming.',
    avatarUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
    bannerUrl: new URL('/img/default-banner.jpg', baseUrl()).href,
    interests: [0],
    cards: {
      free: {
        logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
        color: 0,
      },
      standard: {
        logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
        color: 5,
      },
      premium: {
        logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
        color: 10,
      },
    },
    oboleId: BigInt(1),
    userId: stringToHex('2SZ0zGOcsSko6C48kfOZL25HEkS', { size: 32 }),
  };
  console.log(
    JSON.stringify({ creatorAccount: rawCreatorAccountToCreatorAccount(rawCreatorAccount) }),
  );
  await accounts.createCreatorAccount(rawCreatorAccount);
  const creatorAccount = await accounts.getCreatorAccountByName(name);
  console.log(creatorAccount);
  const rawUserAccount = {
    username: stringToHex('saimeunt', { size: 32 }),
    avatarUrl: new URL('/img/creator5.jpg', baseUrl()).href,
    interests: [0],
    userId: stringToHex('2Sc8ytccwH2ugxoSYg0iCxb8d9n', { size: 32 }),
  };
  await accounts.connect(signer2).createUserAccount(rawUserAccount);
  console.log(JSON.stringify({ userAccount: rawUserAccountToUserAccount(rawUserAccount) }));
  const userAccount = await accounts.getUserAccountByAddress(signer2.address);
  console.log(userAccount);
  await tokens.connect(signer2).mintMembershipCard(name);
  const membershipCardData = await tokens.getMembershipCardData(2);
  console.log(membershipCardData);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
