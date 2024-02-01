import { z } from 'zod';
// import { Post as PrismaPost } from '@prisma/client';
import { type Post as PrismaPost } from '@/prisma/generated/client';

export const postTiers = {
  public: 'Public',
  free: 'Free membership',
  standard: 'Standard membership',
  premium: 'Premium membership',
} as const;

export type PostTierName = keyof typeof postTiers;

export const postTierNames = Object.keys(postTiers) as PostTierName[];

/* const postType = Prisma.validator<Prisma.PostDefaultArgs>()({});

export type Post = Prisma.PostGetPayload<typeof postType>; */

export type Post = PrismaPost;

export const PostSchema = z.object({
  id: z.string(),
  videoUrl: z.string(),
  title: z.string(),
  description: z.string(),
  tier: z.enum(['public', 'free', 'standard', 'premium']),
  date: z.date(),
  creatorAccountId: z.string(),
});

export const defaultPosts = (): Post[] => [
  {
    id: '1',
    videoUrl: 'https://www.youtube.com/watch?v=S1Mvy3E8P2U',
    title: 'Intro live',
    description: 'This is the intro live of the channel, check it out!',
    tier: 'public',
    date: new Date('2023-07-03'),
    creatorAccountId: '1',
  },
  {
    id: '2',
    videoUrl: 'https://www.youtube.com/watch?v=WRWtvbyprgo',
    title: 'Free live',
    description: 'Talking about my favorite musicians.',
    tier: 'free',
    date: new Date('2023-07-10'),
    creatorAccountId: '1',
  },
  {
    id: '3',
    videoUrl: 'https://www.youtube.com/watch?v=Pf_si60K9nM',
    title: 'Standard live',
    description: 'AMA with the community.',
    tier: 'standard',
    date: new Date('2023-07-17'),
    creatorAccountId: '1',
  },
];
