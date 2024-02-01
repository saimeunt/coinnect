import { type Cards, type CardTierName } from '@/app/lib/types';

export type RawCreatorAccount = {
  id: `0x${string}`;
  slug: `0x${string}`;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  interests: readonly number[];
  cards: Cards;
  obolId: bigint;
};

export type RawUserAccount = {
  id: `0x${string}`;
  username: `0x${string}`;
  avatarUrl: string;
  interests: readonly number[];
};

export type RawMembershipCardData = {
  tokenId: bigint;
  color: number;
  logoUrl: string;
  tier: `0x${string}`;
  memberId: bigint;
  mintTimestamp: bigint;
  subscriptionEndTimestamp: bigint;
  username: `0x${string}`;
  avatarUrl: string;
  obolBalance: bigint;
  title: string;
  description: string;
  slug: `0x${string}`;
};

export type MembershipCardData = {
  tokenId: bigint;
  color: string;
  logoUrl: string;
  tier: CardTierName;
  memberId: bigint;
  mintTimestamp: bigint;
  subscriptionEndTimestamp: bigint;
  username: string;
  avatarUrl: string;
  obolBalance: bigint;
  title: string;
  description: string;
  slug: string;
};

export type RawExclusivity = {
  id: `0x${string}`;
  title: string;
  description: string;
  imageUrl: string;
  price: bigint;
  totalSupply: bigint;
  minted: bigint;
  creatorAccountId: `0x${string}`;
  tokenId: bigint;
};
