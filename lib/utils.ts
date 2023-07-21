import { hexToString, stringToHex } from 'viem';
import { OwnedNft } from 'alchemy-sdk';

import {
  RawCreatorAccount,
  CreatorAccount,
  RawTokenData,
  TokenData,
  RawUserAccount,
  UserAccount,
  MembershipCardNft,
  CardTierName,
} from './types';
import { defaultCreatorAccount } from './constants';

export const baseUrl = () =>
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_DAPP_URL;

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(amount)
    .replace(/(\.|,)00$/g, '');

export const rawCreatorAccountToCreatorAccount = (
  rawCreatorAccount: RawCreatorAccount,
): CreatorAccount => ({
  ...rawCreatorAccount,
  name: hexToString(rawCreatorAccount.name, { size: 32 }),
  interests: [...rawCreatorAccount.interests],
  oboleId: Number(rawCreatorAccount.oboleId),
  userId: hexToString(rawCreatorAccount.userId, { size: 32 }),
  /* cards: {
    free: {
      ...rawCreatorAccount.cards.free,
      color: hexToString(rawCreatorAccount.cards.free.color, { size: 32 }),
    },
    standard: {
      ...rawCreatorAccount.cards.standard,
      color: hexToString(rawCreatorAccount.cards.standard.color, { size: 32 }),
    },
    premium: {
      ...rawCreatorAccount.cards.premium,
      color: hexToString(rawCreatorAccount.cards.premium.color, { size: 32 }),
    },
  }, */
});

export const creatorAccountToRawCreatorAccount = (
  creatorAccount: CreatorAccount,
): RawCreatorAccount => ({
  ...creatorAccount,
  name: stringToHex(creatorAccount.name, { size: 32 }),
  oboleId: BigInt(creatorAccount.oboleId),
  userId: stringToHex(creatorAccount.userId, { size: 32 }),
  /* interests: BigInt(0),
  cards: {
    free: {
      ...creatorAccount.cards.free,
      color: stringToHex(creatorAccount.cards.free.color, { size: 32 }),
    },
    standard: {
      ...creatorAccount.cards.standard,
      color: stringToHex(creatorAccount.cards.standard.color, { size: 32 }),
    },
    premium: {
      ...creatorAccount.cards.premium,
      color: stringToHex(creatorAccount.cards.premium.color, { size: 32 }),
    },
  }, */
});

export const rawTokenDataToTokenData = (rawTokenData: RawTokenData): TokenData => ({
  ...rawTokenData,
  // color: hexToString(rawMembershipCardData.color, { size: 32 }),
  tier: hexToString(rawTokenData.tier, { size: 32 }),
  username: hexToString(rawTokenData.username, { size: 32 }),
  name: hexToString(rawTokenData.name, { size: 32 }),
});

export const rawUserAccountToUserAccount = (rawUserAccount: RawUserAccount): UserAccount => ({
  ...rawUserAccount,
  username: hexToString(rawUserAccount.username, { size: 32 }),
  userId: hexToString(rawUserAccount.userId, { size: 32 }),
});

export const userAccountToRawUserAccount = (userAccount: UserAccount): RawUserAccount => ({
  ...userAccount,
  username: stringToHex(userAccount.username, { size: 32 }),
  userId: stringToHex(userAccount.userId, { size: 32 }),
});

export const ownedNftToMembershipCardNft = (ownedNft: OwnedNft): MembershipCardNft => {
  const nameAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'name',
  );
  const name = nameAttribute ? (nameAttribute.value as string) : '';
  const colorAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'color',
  );
  const colorRaw = colorAttribute ? (colorAttribute.value as string) : 'Red';
  const color = colorRaw.toLowerCase();
  const tierAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'tier',
  );
  const tier = tierAttribute ? (tierAttribute.value as CardTierName) : 'free';
  const oboleBalanceAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'oboleBalance',
  );
  const oboleBalance = oboleBalanceAttribute ? (oboleBalanceAttribute.value as number) : 0;
  const subscriptionEndTimestampAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'subscriptionEndTimestamp',
  );
  const subscriptionEndTimestamp = subscriptionEndTimestampAttribute
    ? (subscriptionEndTimestampAttribute.value as number)
    : 0;
  return {
    tokenId: ownedNft.tokenId,
    title: ownedNft.title,
    name,
    tier,
    color,
    oboleBalance,
    subscriptionEndTimestamp,
  };
};

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

export const currentUser = async () => ({
  firstName: 'Firstname',
  lastName: 'Lastname',
  profileImageUrl:
    'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yU1owekhzR3I2OTRtTklpdFVrSjZuaGJNR2QucG5nIn0?width=80',
  publicMetadata: {
    creatorAccount: defaultCreatorAccount(),
  },
  privateMetadata: {
    posts: defaultPosts(),
  },
});
