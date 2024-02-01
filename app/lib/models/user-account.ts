import { z } from 'zod';
// import { UserAccount as PrismaUserAccount } from '@prisma/client';
import { type UserAccount as PrismaUserAccount } from '@/prisma/generated/client';

/* const userAccountType = Prisma.validator<Prisma.UserAccountDefaultArgs>()({});

export type UserAccount = Prisma.UserAccountGetPayload<typeof userAccountType>; */

export const UserAccountSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
  interests: z.array(z.number()).nonempty(),
});

export type UserAccount = PrismaUserAccount;

export const defaultUserAccount = (): UserAccount => ({
  id: '1',
  username: 'username',
  avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
  interests: [],
  userId: '1',
});
