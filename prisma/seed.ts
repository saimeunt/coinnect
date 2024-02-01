// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

const main = async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  const user = await prisma.user.upsert({
    where: { address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' },
    update: {},
    create: {
      id: '1',
      email: 'username@gmail.com',
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      userAccount: {
        create: {
          id: '1',
          username: 'username',
          avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
        },
      },
      creatorAccount: {
        create: {
          id: '1',
          slug: 'test',
          title: 'Test',
          description: 'This is a test.',
          avatarUrl: new URL('/img/creators/default/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL)
            .href,
          bannerUrl: new URL('/img/creators/default/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL)
            .href,
          cards: {
            free: {
              logoUrl: new URL('/img/creators/default/free.jpg', process.env.NEXT_PUBLIC_BASE_URL)
                .href,
              color: 0,
            },
            standard: {
              logoUrl: new URL(
                '/img/creators/default/standard.jpg',
                process.env.NEXT_PUBLIC_BASE_URL,
              ).href,
              color: 5,
            },
            premium: {
              logoUrl: new URL(
                '/img/creators/default/premium.jpg',
                process.env.NEXT_PUBLIC_BASE_URL,
              ).href,
              color: 10,
            },
          },
          obolId: '1',
          posts: {
            create: [
              {
                id: '1',
                videoUrl: 'https://www.youtube.com/watch?v=S1Mvy3E8P2U',
                title: 'Intro live',
                description: 'This is the intro live of the channel, check it out!',
                tier: 'public',
                date: new Date('2023-07-03'),
              },
              {
                id: '2',
                videoUrl: 'https://www.youtube.com/watch?v=WRWtvbyprgo',
                title: 'Free live',
                description: 'Talking about my favorite musicians.',
                tier: 'free',
                date: new Date('2023-07-10'),
              },
              {
                id: '3',
                videoUrl: 'https://www.youtube.com/watch?v=Pf_si60K9nM',
                title: 'Standard live',
                description: 'AMA with the community.',
                tier: 'standard',
                date: new Date('2023-07-17'),
              },
            ],
          },
          exclusivities: {
            create: [
              {
                id: '1',
                title: 'Epic Rabbit Recruit',
                description: 'Epic Rabbit Recruit equipped with sword.',
                imageUrl: new URL(
                  '/img/creators/epic-rabbits/free.jpg',
                  process.env.NEXT_PUBLIC_BASE_URL,
                ).href,
                price: '1000000000',
                totalSupply: '1000',
              },
              {
                id: '2',
                title: 'Epic Rabbit Apprentice',
                description: 'Epic Rabbit Apprentice training.',
                imageUrl: new URL(
                  '/img/creators/epic-rabbits/standard.jpg',
                  process.env.NEXT_PUBLIC_BASE_URL,
                ).href,
                price: '10000000000',
                totalSupply: '100',
              },
              {
                id: '3',
                title: 'Epic Rabbit Squire',
                description: 'Epic Rabbit Squire in leather armor.',
                imageUrl: new URL(
                  '/img/creators/epic-rabbits/premium.jpg',
                  process.env.NEXT_PUBLIC_BASE_URL,
                ).href,
                price: '100000000000',
                totalSupply: '10',
              },
            ],
          },
        },
      },
    },
  });
  console.log(user);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
