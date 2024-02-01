// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@/prisma/generated/client';

let prisma: PrismaClient;

const getPrismaClient = () => {
  if (process.env.NODE_ENV !== 'production') {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  } else {
    return new PrismaClient();
  }
};

export default getPrismaClient;
