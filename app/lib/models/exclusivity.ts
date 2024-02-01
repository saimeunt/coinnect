import { z } from 'zod';
import { parseUnits } from 'viem';
// import { Exclusivity as PrismaExclusivity } from '@prisma/client';
import { type Exclusivity as PrismaExclusivity } from '@/prisma/generated/client';

export type Exclusivity = Omit<PrismaExclusivity, 'tokenId'> & {
  minted: bigint;
  tokenId: bigint;
};

export const ExclusivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  price: z.string().transform((value) => parseUnits(value, 9).toString()),
  totalSupply: z.string(),
  creatorAccountId: z.string(),
});

export const defaultExclusivities = (): Exclusivity[] => [
  {
    id: '1',
    title: 'Epic Rabbit Recruit',
    description: 'Epic Rabbit Recruit equipped with sword.',
    imageUrl: new URL('/img/creators/epic-rabbits/free.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
    price: '1000000000',
    totalSupply: '1000',
    creatorAccountId: '1',
    minted: 0n,
    tokenId: 0n,
  },
  {
    id: '2',
    title: 'Epic Rabbit Apprentice',
    description: 'Epic Rabbit Apprentice training.',
    imageUrl: new URL('/img/creators/epic-rabbits/standard.jpg', process.env.NEXT_PUBLIC_BASE_URL)
      .href,
    price: '10000000000',
    totalSupply: '100',
    creatorAccountId: '1',
    minted: 0n,
    tokenId: 0n,
  },
  {
    id: '3',
    title: 'Epic Rabbit Squire',
    description: 'Epic Rabbit Squire in leather armor.',
    imageUrl: new URL('/img/creators/epic-rabbits/premium.jpg', process.env.NEXT_PUBLIC_BASE_URL)
      .href,
    price: '100000000000',
    totalSupply: '10',
    creatorAccountId: '1',
    minted: 0n,
    tokenId: 0n,
  },
];
