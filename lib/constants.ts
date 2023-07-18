import { CreatorAccount, UserAccount } from './types';
import { baseUrl } from './utils';

export const interests = [
  { id: 0, name: 'Gaming' },
  { id: 1, name: 'Crypto' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Lifestyle' },
  { id: 4, name: 'Travel' },
] as const;

export const defaultCreatorAccount = (): CreatorAccount => ({
  name: '',
  title: '',
  description: '',
  avatarUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
  bannerUrl: new URL('/img/default-banner.jpg', baseUrl()).href,
  interests: [],
  cards: {
    free: { logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href, color: 0 },
    standard: { logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href, color: 5 },
    premium: { logoUrl: new URL('/img/default-avatar.jpg', baseUrl()).href, color: 10 },
  },
  oboleId: 0,
  userId: '',
});

export const defaultUserAccount = (): UserAccount => ({
  username: '',
  avatarUrl: new URL('/img/default-avatar.jpg', baseUrl()).href,
  interests: [],
  userId: '',
});

export const colors = [
  { id: 0, name: 'Red' },
  { id: 1, name: 'Orange' },
  { id: 2, name: 'Amber' },
  { id: 3, name: 'Yellow' },
  { id: 4, name: 'Lime' },
  { id: 5, name: 'Green' },
  { id: 6, name: 'Emerald' },
  { id: 7, name: 'Teal' },
  { id: 8, name: 'Cyan' },
  { id: 9, name: 'Sky' },
  { id: 10, name: 'Blue' },
  { id: 11, name: 'Indigo' },
  { id: 12, name: 'Violet' },
  { id: 13, name: 'Purple' },
  { id: 14, name: 'Pink' },
  { id: 15, name: 'Rose' },
] as const;
