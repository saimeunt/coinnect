import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ContractTransactionResponse } from 'ethers';

import { type Coinnect } from '../typechain-types';

export const defaultCreatorAccount = () => ({
  id: ethers.encodeBytes32String('1'),
  slug: ethers.encodeBytes32String('epic-rabbits'),
  title: 'Epic Rabbits',
  description:
    'Epic Rabbits is a community of generative artificial intelligence enthusiasts. We have free tutorials on Midjourney and private lives where we embark on an adventure to discover and learn Stable Diffusion.',
  avatarUrl: new URL('/img/creators/epic-rabbits/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL)
    .href,
  bannerUrl: new URL('/img/creators/epic-rabbits/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL)
    .href,
  interests: [0n],
  cards: {
    free: {
      logoUrl: new URL('/img/creators/epic-rabbits/free.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 0n,
    },
    standard: {
      logoUrl: new URL('/img/creators/epic-rabbits/standard.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 5n,
    },
    premium: {
      logoUrl: new URL('/img/creators/epic-rabbits/premium.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 10n,
    },
  },
  obolId: 1n,
});

export const rawCreatorAccountToCreatorAccount = ({
  id,
  slug,
  title,
  description,
  avatarUrl,
  bannerUrl,
  interests,
  cards,
  obolId,
}: Coinnect.CreatorAccountStructOutput) => ({
  id,
  slug,
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
  obolId,
});

export const defaultUserAccount = () => ({
  id: ethers.encodeBytes32String('1'),
  username: ethers.encodeBytes32String('saimeunt'),
  avatarUrl: new URL('/img/users/avatar1.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  interests: [0n],
});

export const rawUserAccountToUserAccount = ({
  id,
  username,
  avatarUrl,
  interests,
}: Coinnect.UserAccountStructOutput) => ({ id, username, avatarUrl, interests: [...interests] });

export const rawMembershipCardToMembershipCard = ({
  creatorAccountId,
  userAddress,
  tier,
  memberId,
  mintTimestamp,
  subscriptionDuration,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
}: Coinnect.MembershipCardStructOutput) => ({
  creatorAccountId,
  userAddress,
  tier,
  memberId,
  mintTimestamp,
  subscriptionDuration,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
});

export const rawMembershipCardDataToMembershipCardData = ({
  tokenId,
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  obolBalance,
  title,
  description,
  slug,
}: Coinnect.MembershipCardDataStructOutput) => ({
  tokenId,
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  obolBalance,
  title,
  description,
  slug,
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
