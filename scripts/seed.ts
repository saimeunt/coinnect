import { ethers } from 'hardhat';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { clerkClient } from '@clerk/nextjs';

import {
  rawCreatorAccountToCreatorAccount,
  rawUserAccountToUserAccount,
  baseUrl,
} from '../lib/utils';
import { Accounts, StableCoin, Tokens } from '../typechain-types';

const mainCreatorId =
  process.env.NODE_ENV !== 'production'
    ? 'user_2SZ0zGOcsSko6C48kfOZL25HEkS'
    : 'user_2SklVwW19XjvJpFRWjTE6V5uE2J';
const [, mainCreatorIdRaw] = mainCreatorId.split('_');

const mainCreatorAccount = () => ({
  name: ethers.encodeBytes32String('epic-rabbits') as `0x${string}`,
  title: 'Epic Rabbits',
  description:
    'Epic Rabbits is a community of generative artificial intelligence enthusiasts. We have free tutorials on Midjourney and private lives where we embark on an adventure to discover and learn Stable Diffusion.',
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
  userId: ethers.encodeBytes32String(mainCreatorIdRaw) as `0x${string}`,
});

const simpleCreatorAccount = ({
  name,
  title,
  description,
  oboleId,
}: {
  name: string;
  title: string;
  description: string;
  oboleId: number;
}) => ({
  name: ethers.encodeBytes32String(name) as `0x${string}`,
  title,
  description,
  avatarUrl: new URL(`/img/creators/${name}/avatar.jpg`, baseUrl()).href,
  bannerUrl: new URL(`/img/creators/${name}/banner.jpg`, baseUrl()).href,
  interests: [0],
  cards: {
    free: {
      logoUrl: new URL(`/img/creators/${name}/avatar.jpg`, baseUrl()).href,
      color: 0,
    },
    standard: {
      logoUrl: new URL(`/img/creators/${name}/avatar.jpg`, baseUrl()).href,
      color: 5,
    },
    premium: {
      logoUrl: new URL(`/img/creators/${name}/avatar.jpg`, baseUrl()).href,
      color: 10,
    },
  },
  oboleId: BigInt(oboleId),
  userId: ethers.encodeBytes32String(mainCreatorIdRaw) as `0x${string}`,
});

const simpleCreators = [
  {
    name: 'tribe-diamonds',
    title: 'Tribe Diamonds',
    description:
      'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming. Holders can access a private community of gamers, crypto game developers and NFT collectors.',
  },
  {
    name: 'jrny-club-official',
    title: 'JRNY Club',
    description:
      'JRNY Club is a membership NFT that grants access to future sets, private community access, exclusive NFT videos, early access to partner NFT projects and more.',
  },
  {
    name: 'frequencypass',
    title: 'FREQUENCY PASS ®',
    description:
      'The FREQUENCY PASS ® is your first 🔑 to enter the AVØLVE ecosystem and become part of our curated community.',
  },
  {
    name: 'bens-trial-of-eyes',
    title: 'BENS Finale Trial of the Eyes',
    description:
      'Your time is running out, trials of tribulation are FINALE here. A last chance, a last opportunity. Have you been paying attention?',
  },
  {
    name: 'grumbies-eternal-entry',
    title: 'Grumbies Eternal Entry',
    description:
      'The Grumbies Eternal Entry is an access pass to the Grumbies ecosystem that gives you discounts and preferred access to games and experiences to win Ethereum.',
  },
  {
    name: 'applied-primate-keycard',
    title: 'Applied Primate Keycard',
    description:
      'This Maximum Security Keycard gives its holder access to all assignments at AppliedPrimate and is also used to track progress and record successful completion of key missions.',
  },
  {
    name: 'gorilla-mansion',
    title: 'Gorilla Mansion Origin',
    description:
      'Do you find yourself itching & scratching a lot? You might have Gorillaitus. You may need to sweep a bunch of Gorillas to shake this feeling!',
  },
  {
    name: 'metarides-pit-pass',
    title: 'MetaRides Pit Pass Memberships',
    description: 'MetaRides.io Pit Pass Memberships!',
  },
];

export const defaultPosts = () => [
  {
    videoUrl: 'https://www.youtube.com/watch?v=S1Mvy3E8P2U',
    title: 'Intro live',
    description: 'This is the intro live of the channel, check it out!',
    tier: 'public',
    date: new Date('2023-07-03').toISOString(),
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=WRWtvbyprgo',
    title: 'Free live',
    description: 'Talking about my favorite musicians.',
    tier: 'free',
    date: new Date('2023-07-10').toISOString(),
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=Pf_si60K9nM',
    title: 'Standard live',
    description: 'AMA with the community.',
    tier: 'standard',
    date: new Date('2023-07-17').toISOString(),
  },
];

const seed = async (stableCoin: StableCoin, accounts: Accounts, tokens: Tokens) => {
  // get signers
  const [signer1, signer2, signer3, signer4, signer5, signer6, signer7, signer8, signer9] =
    await ethers.getSigners();
  // mint StableCoin to users
  const stableCoinAmount = '10000';
  const stableCoinAmountInUnits = ethers.parseUnits('10000', 6);
  const creatorAddress = signer1.address;
  let tx = await stableCoin.mint(signer1.address, stableCoinAmountInUnits);
  await tx.wait();
  console.log(`Minted ${stableCoinAmount} USDC to ${creatorAddress}`);
  const user1Address =
    process.env.NODE_ENV !== 'production' ? signer2.address : process.env.USER1_ADDRESS;
  tx = await stableCoin.mint(user1Address, stableCoinAmountInUnits);
  await tx.wait();
  console.log(`Minted ${stableCoinAmount} USDC to ${user1Address}`);
  const user2Address =
    process.env.NODE_ENV !== 'production' ? signer3.address : process.env.USER2_ADDRESS;
  tx = await stableCoin.mint(user2Address, stableCoinAmountInUnits);
  await tx.wait();
  console.log(`Minted ${stableCoinAmount} USDC to ${user2Address}`);
  const user3Address =
    process.env.NODE_ENV !== 'production' ? signer4.address : process.env.USER3_ADDRESS;
  tx = await stableCoin.mint(user3Address, stableCoinAmountInUnits);
  await tx.wait();
  console.log(`Minted ${stableCoinAmount} USDC to ${user3Address}`);
  // create main creator account
  const rawMainCreatorAccount = mainCreatorAccount();
  await clerkClient.users.updateUserMetadata(mainCreatorId, {
    publicMetadata: { creatorAccount: rawCreatorAccountToCreatorAccount(rawMainCreatorAccount) },
    privateMetadata: { posts: defaultPosts() },
  });
  tx = await accounts.createCreatorAccount(rawMainCreatorAccount);
  await tx.wait();
  console.log('Created main creator account');
  if (process.env.NODE_ENV !== 'production') {
    // create simple creator accounts
    const rawSimpleCreatorAccounts = simpleCreators.map((simpleCreator, index) =>
      simpleCreatorAccount({ ...simpleCreator, oboleId: index + 2 }),
    );
    const signers = [signer2, signer3, signer4, signer5, signer6, signer7, signer8, signer9];
    let signerIndex = 0;
    for (const rawSimpleCreatorAccount of rawSimpleCreatorAccounts) {
      tx = await accounts
        .connect(signers[signerIndex])
        .createCreatorAccount(rawSimpleCreatorAccount);
      await tx.wait();
      signerIndex++;
    }
    console.log('Created simple creator accounts');
    // create user account
    const userId = 'user_2Sc8ytccwH2ugxoSYg0iCxb8d9n';
    const [, userIdRaw] = userId.split('_');
    const rawUserAccount = {
      username: ethers.encodeBytes32String('saimeunt') as `0x${string}`,
      avatarUrl: new URL('/img/users/avatar10.jpg', baseUrl()).href,
      interests: [0],
      userId: ethers.encodeBytes32String(userIdRaw) as `0x${string}`,
    };
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { userAccount: rawUserAccountToUserAccount(rawUserAccount) },
    });
    tx = await accounts.connect(signer2).createUserAccount(rawUserAccount);
    await tx.wait();
    const name = ethers.encodeBytes32String('epic-rabbits');
    tx = await tokens.connect(signer2).mintMembershipCard(name);
    await tx.wait();
    /* tx = await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('25', 6));
    await tx.wait();
    tx = await tokens.connect(signer2).donate(name, ethers.parseUnits('10', 6));
    await tx.wait();
    const userBalance1 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance1 = await tokens.balanceOf(signer2.address, rawMainCreatorAccount.oboleId);
    console.log({
      userBalance1: ethers.formatUnits(userBalance1, 6),
      oboleBalance1: ethers.formatUnits(oboleBalance1, 9),
    });
    const tier = ethers.encodeBytes32String('standard');
    tx = await tokens.connect(signer2).subscribe(name, tier, 1);
    await tx.wait();
    await time.increase(60 * 60 * 24);
    const rewardsAmount1 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount1: ethers.formatUnits(rewardsAmount1, 9) });
    tx = await tokens.connect(signer2).claimRewards(name);
    await tx.wait();
    const userBalance2 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance2 = await tokens.balanceOf(signer2.address, rawMainCreatorAccount.oboleId);
    console.log({
      userBalance: ethers.formatUnits(userBalance2, 6),
      oboleBalance2: ethers.formatUnits(oboleBalance2, 9),
    });
    const rewardsAmount2 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount2: ethers.formatUnits(rewardsAmount2, 9) });
    await time.increase(60 * 60 * 24 * 60);
    const rewardsAmount3 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount3: ethers.formatUnits(rewardsAmount3, 9) });
    tx = await tokens.withdraw();
    await tx.wait();
    const creatorBalance = await stableCoin.balanceOf(signer1.address);
    console.log({ creatorBalance: ethers.formatUnits(creatorBalance, 6) }); */
  }
};

export default seed;
