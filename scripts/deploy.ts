import { ethers } from 'hardhat';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { stringToHex, parseUnits, formatUnits } from 'viem';
import { clerkClient } from '@clerk/nextjs';

import {
  rawCreatorAccountToCreatorAccount,
  rawUserAccountToUserAccount,
  baseUrl,
  defaultPosts,
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
  const tokens = await ethers.deployContract('Tokens', [
    `${baseUrl()}/api/tokens/{id}.json`,
    stableCoin.target,
    accounts.target,
  ]);
  await tokens.waitForDeployment();
  console.log(`Tokens successfully deployed to ${tokens.target}`);
  const tx = await accounts.setTokens(tokens.target);
  await tx.wait();
  console.log('accounts.setTokens');
  //
  const [signer1, signer2, signer3] = await ethers.getSigners();
  await stableCoin.mint(signer1, parseUnits('10000', 6));
  console.log('stableCoin.mint');
  if (process.env.NODE_ENV !== 'production') {
    await stableCoin.mint(signer2, parseUnits('10000', 6));
    await stableCoin.mint(signer3, parseUnits('10000', 6));
  }
  //
  const userId1 =
    process.env.NODE_ENV !== 'production'
      ? 'user_2SZ0zGOcsSko6C48kfOZL25HEkS'
      : 'user_2SklVwW19XjvJpFRWjTE6V5uE2J';
  const [, userId1Raw] = userId1.split('_');
  const name1 = stringToHex('epic-rabbits', { size: 32 });
  const rawCreatorAccount1 = {
    name: name1,
    title: 'Epic Rabbits',
    description:
      'Epic Rabbits is a community of generative artificial intelligence enthusiasts. We have free tutorials on Midjourney and private lives where we embark on a journey to discover and learn Stable Diffusion.',
    avatarUrl: new URL('/img/creators/epic-rabbits/avatar.jpg', baseUrl()).href,
    bannerUrl: new URL('/img/creators/epic-rabbits/banner.jpg', baseUrl()).href,
    interests: [0],
    cards: {
      free: {
        logoUrl: new URL('/img/creators/epic-rabbits/free.jpg', baseUrl()).href,
        color: 0,
      },
      standard: {
        logoUrl: new URL('/img/creators/epic-rabbits/standard.jpg', baseUrl()).href,
        color: 5,
      },
      premium: {
        logoUrl: new URL('/img/creators/epic-rabbits/premium.jpg', baseUrl()).href,
        color: 10,
      },
    },
    oboleId: BigInt(1),
    userId: stringToHex(userId1Raw, { size: 32 }),
  };
  /* const name2 = stringToHex('tribe-diamond', { size: 32 });
  const rawCreatorAccount2 = {
    name: name2,
    title: 'Tribe Diamond',
    description:
      'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming.',
    avatarUrl: new URL('/img/creators/tribe-diamond/avatar.jpg', baseUrl()).href,
    bannerUrl: new URL('/img/creators/tribe-diamond/banner.jpg', baseUrl()).href,
    interests: [0],
    cards: {
      free: {
        logoUrl: new URL('/img/creators/tribe-diamond/free.jpg', baseUrl()).href,
        color: 0,
      },
      standard: {
        logoUrl: new URL('/img/creators/tribe-diamond/standard.jpg', baseUrl()).href,
        color: 5,
      },
      premium: {
        logoUrl: new URL('/img/creators/tribe-diamond/premium.jpg', baseUrl()).href,
        color: 10,
      },
    },
    oboleId: BigInt(2),
    userId: stringToHex(userId1Raw, { size: 32 }),
  }; */
  // console.log(JSON.stringify({ creatorAccount: userCreatorAccount }));
  await clerkClient.users.updateUserMetadata(userId1, {
    publicMetadata: { creatorAccount: rawCreatorAccountToCreatorAccount(rawCreatorAccount1) },
    privateMetadata: { posts: defaultPosts() },
  });
  console.log('clerkClient.users.updateUserMetadata');
  const tx1 = await accounts.createCreatorAccount(rawCreatorAccount1);
  await tx1.wait();
  console.log('accounts.createCreatorAccount');
  const creatorAccount = await accounts.getCreatorAccountByName(name1);
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
    const tx2 = await accounts.connect(signer2).createUserAccount(rawUserAccount);
    await tx2.wait();
    // console.log(JSON.stringify({ userAccount: userUserAccount }));
    await clerkClient.users.updateUserMetadata(userId2, {
      publicMetadata: { userAccount: rawUserAccountToUserAccount(rawUserAccount) },
    });
    const userAccount = await accounts.getUserAccountByAddress(signer2.address);
    console.log(userAccount);
    const tx3 = await tokens.connect(signer2).mintMembershipCard(name1);
    await tx3.wait();
    const membershipCardData = await tokens.getTokenData(BigInt(2));
    console.log(membershipCardData);
    const uri = await tokens.uri(BigInt(2));
    console.log(uri);
    const tx4 = await stableCoin.connect(signer2).approve(tokens.target, parseUnits('10000', 6));
    await tx4.wait();
    const tx5 = await tokens.connect(signer2).donate(name1, parseUnits('10', 6));
    await tx5.wait();
    const userBalance1 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance1 = await tokens.balanceOf(signer2.address, creatorAccount.oboleId);
    console.log({
      userBalance1: formatUnits(userBalance1, 6),
      oboleBalance1: formatUnits(oboleBalance1, 9),
    });
    /* const tier = stringToHex('standard', { size: 32 });
    const tx7 = await tokens.connect(signer2).subscribe(name1, tier, 1);
    await tx7.wait();
    await time.increase(60 * 60 * 24);
    const rewardsAmount1 = await tokens.rewardsAmount(signer2.address, name1);
    console.log({ rewardsAmount1: formatUnits(rewardsAmount1, 9) });
    const tx8 = await tokens.connect(signer2).claimRewards(name1);
    await tx8.wait();
    const userBalance2 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance2 = await tokens.balanceOf(signer2.address, creatorAccount.oboleId);
    console.log({
      userBalance: formatUnits(userBalance2, 6),
      oboleBalance2: formatUnits(oboleBalance2, 9),
    });
    const rewardsAmount2 = await tokens.rewardsAmount(signer2.address, name1);
    console.log({ rewardsAmount2: formatUnits(rewardsAmount2, 9) });
    await time.increase(60 * 60 * 24 * 60);
    const rewardsAmount3 = await tokens.rewardsAmount(signer2.address, name1);
    console.log({ rewardsAmount3: formatUnits(rewardsAmount3, 9) });
    const tx9 = await tokens.withdraw();
    await tx9.wait();
    const creatorBalance = await stableCoin.balanceOf(signer1.address);
    console.log({ creatorBalance: formatUnits(creatorBalance, 6) }); */
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
