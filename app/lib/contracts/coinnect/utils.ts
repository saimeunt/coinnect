import { hexToString, stringToHex } from 'viem';

import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type UserAccount } from '@/app/lib/models/user-account';
import { type Exclusivity } from '@/app/lib/models/exclusivity';
import { type Cards, type CardTierName } from '@/app/lib/types';
import {
  type RawCreatorAccount,
  type RawUserAccount,
  type RawMembershipCardData,
  type MembershipCardData,
  type RawExclusivity,
} from '@/app/lib/contracts/coinnect/types';
import { colorNumberToString } from '@/app/lib/utils';

export const rawCreatorAccountToCreatorAccount = (
  rawCreatorAccount: RawCreatorAccount,
): CreatorAccount => ({
  ...rawCreatorAccount,
  id: hexToString(rawCreatorAccount.id, { size: 32 }),
  slug: hexToString(rawCreatorAccount.slug, { size: 32 }),
  interests: [...rawCreatorAccount.interests],
  userId: '',
  posts: [],
  exclusivities: [],
});

export const creatorAccountToRawCreatorAccount = (
  creatorAccount: CreatorAccount,
): RawCreatorAccount => ({
  ...creatorAccount,
  id: stringToHex(creatorAccount.id, { size: 32 }),
  slug: stringToHex(creatorAccount.slug, { size: 32 }),
  cards: creatorAccount.cards as Cards,
});

export const rawUserAccountToUserAccount = (rawUserAccount: RawUserAccount): UserAccount => ({
  ...rawUserAccount,
  id: hexToString(rawUserAccount.id, { size: 32 }),
  username: hexToString(rawUserAccount.username, { size: 32 }),
  interests: [...rawUserAccount.interests],
  userId: '',
});

export const userAccountToRawUserAccount = (userAccount: UserAccount): RawUserAccount => ({
  ...userAccount,
  id: stringToHex(userAccount.id, { size: 32 }),
  username: stringToHex(userAccount.username, { size: 32 }),
  interests: [...userAccount.interests],
});

export const defaultRawMembershipCardData = (): RawMembershipCardData => ({
  tokenId: 0n,
  color: 0,
  logoUrl: new URL('/img/creators/default/free.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  tier: stringToHex('free', { size: 32 }),
  memberId: 0n,
  mintTimestamp: 0n,
  subscriptionEndTimestamp: 0n,
  username: stringToHex('username', { size: 32 }),
  avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  obolBalance: 0n,
  title: 'Test',
  description: '',
  slug: stringToHex('test', { size: 32 }),
});

export const defaultMembershipCardData = (): MembershipCardData => ({
  tokenId: 0n,
  color: 'red',
  logoUrl: new URL('/img/creators/default/free.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  tier: 'free',
  memberId: 0n,
  mintTimestamp: 0n,
  subscriptionEndTimestamp: 0n,
  username: 'username',
  avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  obolBalance: 0n,
  title: 'Test',
  description: '',
  slug: 'test',
});

export const rawMembershipCardDataToMembershipCardData = (
  rawTokenData: RawMembershipCardData,
): MembershipCardData => ({
  ...rawTokenData,
  color: colorNumberToString(rawTokenData.color),
  tier: hexToString(rawTokenData.tier, { size: 32 }) as CardTierName,
  username: hexToString(rawTokenData.username, { size: 32 }),
  slug: hexToString(rawTokenData.slug, { size: 32 }),
});

export const exclusivityToRawExclusivity = (exclusivity: Exclusivity): RawExclusivity => ({
  ...exclusivity,
  id: stringToHex(exclusivity.id, { size: 32 }),
  price: BigInt(exclusivity.price),
  totalSupply: BigInt(exclusivity.totalSupply),
  minted: 0n,
  creatorAccountId: stringToHex(exclusivity.creatorAccountId, { size: 32 }),
});
