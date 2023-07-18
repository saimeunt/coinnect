import { ethers } from 'hardhat';
import { stringToHex } from 'viem';
import { clerkClient } from '@clerk/nextjs';

import {
  rawCreatorAccountToCreatorAccount,
  rawUserAccountToUserAccount,
  baseUrl,
} from '../lib/utils';

async function main() {
  // const [signer1, signer2, signer3] = await ethers.getSigners();
  // console.log(signer1, signer2, signer3);
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
  await stableCoin.mint(signer1, 10000);
  if (process.env.NODE_ENV !== 'production') {
    await stableCoin.mint(signer2, 10000);
    await stableCoin.mint(signer3, 10000);
  }
  //
  const name = stringToHex('tribe-diamond', { size: 32 });
  const userId1 = 'user_2SZ0zGOcsSko6C48kfOZL25HEkS';
  const [, userId1Raw] = userId1.split('_');
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
    userId: stringToHex(userId1Raw, { size: 32 }),
  };
  const userCreatorAccount = rawCreatorAccountToCreatorAccount(rawCreatorAccount);
  console.log(JSON.stringify({ creatorAccount: userCreatorAccount }));
  await clerkClient.users.updateUserMetadata(userId1, {
    publicMetadata: { creatorAccount: userCreatorAccount },
  });
  await accounts.createCreatorAccount(rawCreatorAccount);
  const creatorAccount = await accounts.getCreatorAccountByName(name);
  console.log(creatorAccount);
  if (process.env.NODE_ENV !== 'production') {
    const userId2 = 'user_2Sc8ytccwH2ugxoSYg0iCxb8d9n';
    const [, userId2Raw] = userId2.split('_');
    const rawUserAccount = {
      username: stringToHex('saimeunt', { size: 32 }),
      avatarUrl: new URL('/img/creator5.jpg', baseUrl()).href,
      interests: [0],
      userId: stringToHex(userId2Raw, { size: 32 }),
    };
    await accounts.connect(signer2).createUserAccount(rawUserAccount);
    const userUserAccount = rawUserAccountToUserAccount(rawUserAccount);
    console.log(JSON.stringify({ userAccount: userUserAccount }));
    await clerkClient.users.updateUserMetadata(userId2, {
      publicMetadata: { userAccount: userUserAccount },
    });
    const userAccount = await accounts.getUserAccountByAddress(signer2.address);
    console.log(userAccount);
    await tokens.connect(signer2).mintMembershipCard(name);
    const membershipCardData = await tokens.getMembershipCardData(2);
    console.log(membershipCardData);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
