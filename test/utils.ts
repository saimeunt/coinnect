import { expect } from 'chai';
import { ethers } from 'hardhat';

import { Accounts, Tokens } from '../typechain-types';
import { ContractTransactionResponse } from 'ethers';

export const baseUrl = () => 'http://localhost:3000';

export const userId1Raw = '2SZ0zGOcsSko6C48kfOZL25HEkS';
export const userId2Raw = '2SklVwW19XjvJpFRWjTE6V5uE2J';

export const defaultCreatorAccount = () => ({
  name: ethers.encodeBytes32String('epic-rabbits'),
  title: 'Epic Rabbits',
  description:
    'Epic Rabbits is a community of generative artificial intelligence enthusiasts. We have free tutorials on Midjourney and private lives where we embark on a journey to discover and learn Stable Diffusion.',
  avatarUrl: new URL('/img/creators/epic-rabbits/avatar.jpg', baseUrl()).href,
  bannerUrl: new URL('/img/creators/epic-rabbits/banner.jpg', baseUrl()).href,
  interests: [BigInt(0)],
  cards: {
    free: {
      logoUrl: new URL('/img/creators/epic-rabbits/free.jpg', baseUrl()).href,
      color: BigInt(0),
    },
    standard: {
      logoUrl: new URL('/img/creators/epic-rabbits/standard.jpg', baseUrl()).href,
      color: BigInt(5),
    },
    premium: {
      logoUrl: new URL('/img/creators/epic-rabbits/premium.jpg', baseUrl()).href,
      color: BigInt(10),
    },
  },
  oboleId: BigInt(1),
  userId: ethers.encodeBytes32String(userId1Raw),
});

export const rawCreatorAccountToCreatorAccount = ({
  name,
  title,
  description,
  avatarUrl,
  bannerUrl,
  interests,
  cards,
  oboleId,
  userId,
}: Accounts.CreatorAccountStructOutput) => ({
  name,
  title,
  description,
  avatarUrl,
  bannerUrl,
  interests: [...interests],
  cards: {
    free: { logoUrl: cards.free.logoUrl, color: cards.free.color },
    standard: { logoUrl: cards.standard.logoUrl, color: cards.standard.color },
    premium: { logoUrl: cards.premium.logoUrl, color: cards.premium.color },
  },
  oboleId,
  userId,
});

export const defaultUserAccount = () => ({
  username: ethers.encodeBytes32String('saimeunt'),
  avatarUrl: new URL('/img/users/avatar1.jpg', baseUrl()).href,
  interests: [BigInt(0)],
  userId: ethers.encodeBytes32String(userId2Raw),
});

export const rawUserAccountToUserAccount = ({
  username,
  avatarUrl,
  interests,
  userId,
}: Accounts.UserAccountStructOutput) => ({
  username,
  avatarUrl,
  interests: [...interests],
  userId,
});

export const rawMembershipCardToMembershipCard = ({
  creatorName,
  userAddress,
  tier,
  memberId,
  mintTimestamp,
  subscriptionDuration,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
}: {
  creatorName: string;
  userAddress: string;
  tier: string;
  memberId: bigint;
  mintTimestamp: bigint;
  subscriptionDuration: bigint;
  subscriptionStartTimestamp: bigint;
  subscriptionEndTimestamp: bigint;
}) => ({
  creatorName,
  userAddress,
  tier,
  memberId,
  mintTimestamp,
  subscriptionDuration,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
});

export const rawTokenDataToTokenData = ({
  tokenId,
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  name,
}: Tokens.TokenDataStructOutput) => ({
  tokenId,
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  name,
});

export const getBlockTimestamp = async (tx: ContractTransactionResponse) => {
  if (!tx.blockNumber) {
    expect.fail('tx.blockNumber');
  }
  const block = await ethers.provider.getBlock(tx.blockNumber);
  if (!block) {
    expect.fail('block');
  }
  return block.timestamp;
};
