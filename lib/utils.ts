import { hexToString, stringToHex, formatUnits } from 'viem';

import {
  RawCreatorAccount,
  CreatorAccount,
  RawTokenData,
  TokenData,
  RawUserAccount,
  UserAccount,
  CardTierName,
} from './types';
import { colors } from './constants';

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

export const formatObole = (amount: bigint) => Number(Number(formatUnits(amount, 9)).toFixed(4));

export const colorNumberToString = (colorNumber: number) => {
  const { name: color } = colors.find(({ id }) => id === colorNumber) as {
    id: number;
    name: string;
  };
  return color.toLowerCase();
};

export const defaultCreatorAccount = (): CreatorAccount => ({
  name: '',
  title: '',
  description: '',
  avatarUrl: new URL('/img/creators/default/avatar.jpg', baseUrl()).href,
  bannerUrl: new URL('/img/creators/default/banner.jpg', baseUrl()).href,
  interests: [],
  cards: {
    free: { logoUrl: new URL('/img/creators/default/free.jpg', baseUrl()).href, color: 0 },
    standard: { logoUrl: new URL('/img/creators/default/standard.jpg', baseUrl()).href, color: 5 },
    premium: { logoUrl: new URL('/img/creators/default/premium.jpg', baseUrl()).href, color: 10 },
  },
  oboleId: 0,
  userId: '',
});

export const defaultUserAccount = (): UserAccount => ({
  username: '',
  avatarUrl: new URL('/img/creator5.jpg', baseUrl()).href,
  interests: [],
  userId: '',
});

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
  color: colorNumberToString(rawTokenData.color),
  tier: hexToString(rawTokenData.tier, { size: 32 }) as CardTierName,
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

/* export const currentUser = async () => ({
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
}); */
