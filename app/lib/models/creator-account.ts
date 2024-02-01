import { isEqual, omit } from 'lodash';
import { z } from 'zod';
// import { CreatorAccount as PrismaCreatorAccount } from '@prisma/client';
import { type CreatorAccount as PrismaCreatorAccount } from '@/prisma/generated/client';
import { type Cards } from '@/app/lib/types';
import { type Post, defaultPosts } from '@/app/lib/models/post';
import { type Exclusivity, defaultExclusivities } from '@/app/lib/models/exclusivity';

/* const creatorAccountType = Prisma.validator<Prisma.CreatorAccountDefaultArgs>()({});

export type CreatorAccount = Prisma.CreatorAccountGetPayload<typeof creatorAccountType> & {
  cards: Cards;
}; */

export type CreatorAccount = Omit<PrismaCreatorAccount, 'obolId'> & {
  cards: Cards;
  posts: Post[];
  exclusivities: Exclusivity[];
  obolId: bigint;
};

export const CardSchema = z.object({
  logoUrl: z.string(),
  color: z.coerce.number(),
});

export const CreatorAccountSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  avatarUrl: z.string(),
  bannerUrl: z.string(),
  interests: z.array(z.number()).nonempty(),
  cards: z.object({
    free: CardSchema,
    standard: CardSchema,
    premium: CardSchema,
  }),
});

export const defaultCards = (): Cards => ({
  free: {
    logoUrl: new URL('/img/creators/default/free.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
    color: 0,
  },
  standard: {
    logoUrl: new URL('/img/creators/default/standard.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
    color: 5,
  },
  premium: {
    logoUrl: new URL('/img/creators/default/premium.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
    color: 10,
  },
});

export const defaultCreatorAccount = (): CreatorAccount => ({
  id: '1',
  slug: 'test',
  title: 'Test',
  description: 'This is a test.',
  avatarUrl: new URL('/img/creators/default/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  bannerUrl: new URL('/img/creators/default/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  interests: [],
  cards: {
    free: {
      logoUrl: new URL('/img/creators/default/free.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 0,
    },
    standard: {
      logoUrl: new URL('/img/creators/default/standard.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 5,
    },
    premium: {
      logoUrl: new URL('/img/creators/default/premium.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 10,
    },
  },
  obolId: 0n,
  userId: '1',
  posts: defaultPosts(),
  exclusivities: defaultExclusivities(),
});

export const isCreatorAccountPublished = (
  userCreatorAccount: CreatorAccount,
  creatorAccount: CreatorAccount | null,
) => {
  const omitted = ['id', 'obolId', 'userId', 'posts', 'exclusivities'];
  return isEqual(omit(userCreatorAccount, omitted), omit(creatorAccount, omitted));
};
