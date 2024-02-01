// import { User as PrismaUser, Prisma } from '@prisma/client';
import { type User as PrismaUser, Prisma } from '@/prisma/generated/client';

import { currentAddress } from '@/app/lib/session';
import getPrismaClient from '@/app/lib/models/prisma';
import { type Cards } from '@/app/lib/types';
import { type UserAccount /*, defaultUserAccount*/ } from '@/app/lib/models/user-account';
import { type CreatorAccount /*, defaultCreatorAccount*/ } from '@/app/lib/models/creator-account';

const transformUserType = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { userAccount: true, creatorAccount: { include: { posts: true, exclusivities: true } } },
});

type TransformUser = Prisma.UserGetPayload<typeof transformUserType>;

export type User = PrismaUser & {
  address: `0x${string}`;
  userAccount: UserAccount | null;
  creatorAccount: CreatorAccount | null;
};

const transformUser = (user: TransformUser) => ({
  ...user,
  address: user.address as `0x${string}`,
  creatorAccount: user.creatorAccount
    ? {
        ...user.creatorAccount,
        cards: user.creatorAccount.cards as Cards,
        obolId: BigInt(user.creatorAccount.obolId),
        exclusivities: user.creatorAccount.exclusivities.map((exclusivity) => ({
          ...exclusivity,
          minted: 0n,
          tokenId: BigInt(exclusivity.tokenId),
        })),
      }
    : null,
  userAccount: user.userAccount ? user.userAccount : null,
});

export const getUserByAddress = async (address: `0x${string}`): Promise<User | null> => {
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: { address },
    include: {
      userAccount: true,
      creatorAccount: { include: { posts: true, exclusivities: true } },
    },
  });
  if (!user) {
    return null;
  }
  return transformUser(user);
};

export const getUserByCreatorAccountId = async (creatorAccountId: string): Promise<User | null> => {
  const prisma = getPrismaClient();
  const user = await prisma.user.findFirst({
    where: { creatorAccount: { is: { id: creatorAccountId } } },
    include: {
      userAccount: true,
      creatorAccount: { include: { posts: true, exclusivities: true } },
    },
  });
  if (!user) {
    return null;
  }
  return transformUser(user);
};

export const currentUser = async () => getUserByAddress(await currentAddress());
