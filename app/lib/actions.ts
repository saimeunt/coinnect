'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
// import { Magic } from '@magic-sdk/admin';
import { SiweMessage, generateNonce as siweGenerateNonce } from 'siwe';

import { currentUser } from '@/app/lib/models/user';
import nftStorage, { gatewayUrl } from '@/app/lib/nft-storage';
import { type CardTierName, type Cards } from '@/app/lib/types';
import { PostSchema } from '@/app/lib/models/post';
import { CreatorAccountSchema, CardSchema, defaultCards } from '@/app/lib/models/creator-account';
import { UserAccountSchema } from '@/app/lib/models/user-account';
import { ExclusivitySchema } from '@/app/lib/models/exclusivity';
import getPrismaClient from '@/app/lib/models/prisma';
import { getSession } from '@/app/lib/session';

/* const addressFromIdToken = (idToken: string) => {
  const [, claim] = JSON.parse(Buffer.from(idToken, 'base64').toString()) as [string, string];
  const { iss } = JSON.parse(claim) as {
    // iat: number;
    // ext: number;
    iss: string;
    // sub: string;
    // aud: string;
    // nbf: number;
    // tid: string;
    // add: string;
  };
  const [, , address] = iss.split(':');
  return address as `0x${string}`;
}; */

/* export const signInWithIdToken = async (idToken: string) => {
  const magic = await Magic.init(process.env.MAGIC_SECRET_KEY);
  magic.token.validate(idToken);
  const address = addressFromIdToken(idToken);
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({ where: { address } });
  if (!user) {
    await prisma.user.create({
      data: { address },
    });
  }
  const session = await getSession();
  session.address = address;
  await session.save();
}; */

export const generateNonce = async () => {
  const nonce = await siweGenerateNonce();
  cookies().set('siwe-nonce', nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 mins
    path: '/',
  });
  return nonce;
};

export const signInWithEthereum = async (
  message: string,
  signature: `0x${string}`,
  signUp: boolean,
) => {
  const siweMessage = new SiweMessage(message);
  const [session, fields, siweNonceCookie] = await Promise.all([
    getSession(),
    siweMessage.verify({ signature }),
    cookies().get('siwe-nonce'),
  ]);
  if (fields.data.nonce !== siweNonceCookie?.value) {
    throw new Error('Invalid nonce.');
  }
  session.isLoggedIn = true;
  session.address = fields.data.address as `0x${string}`;
  await session.save();
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: { address: session.address },
    include: {
      userAccount: true,
      creatorAccount: true,
    },
  });
  if (user) {
    if (!signUp) {
      redirect(user.creatorAccount ? '/creator' : '/user');
    }
  } else {
    await prisma.user.create({
      data: { address: session.address },
    });
  }
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect('/');
};

export const createCreatorAccount = async (
  prevState: {
    errors?: {
      slug?: string[];
      title?: string[];
      interests?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = CreatorAccountSchema.omit({
    id: true,
    description: true,
    avatarUrl: true,
    bannerUrl: true,
    cards: true,
  }).safeParse({
    slug: formData.get('slug'),
    title: formData.get('title'),
    interests: formData.getAll('interests').map((interest) => Number(interest)),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    const prisma = getPrismaClient();
    await Promise.all([
      prisma.creatorAccount.create({
        data: {
          ...validatedFields.data,
          avatarUrl: new URL('/img/creators/default/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL)
            .href,
          bannerUrl: new URL('/img/creators/default/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL)
            .href,
          cards: defaultCards(),
          userId: user.id,
        },
      }),
      !user.userAccount &&
        prisma.userAccount.create({
          data: {
            username: validatedFields.data.slug,
            avatarUrl: new URL('/img/creators/default/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL)
              .href,
            interests: validatedFields.data.interests,
            userId: user.id,
          },
        }),
    ]);
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create creator account.' };
  }
  redirect('/creator');
};

export const setCreatorAccountObolId = async (creatorAccountId: string, obolId: string) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount || user.creatorAccount.obolId !== 0n) {
    throw new Error('Unauthorized.');
  }
  await getPrismaClient().creatorAccount.update({
    where: { id: creatorAccountId },
    data: { obolId },
  });
};

export const createUserAccount = async (
  creatorAccountSlug: string | null,
  prevState: {
    errors?: {
      username?: string[];
      interests?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = UserAccountSchema.omit({
    id: true,
    avatarUrl: true,
  }).safeParse({
    username: formData.get('username'),
    interests: formData.getAll('interests').map((interest) => Number(interest)),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    const avatar = formData.get('avatar') as File;
    const avatarCid = avatar.size > 0 ? await nftStorage.storeBlob(avatar) : null;
    const avatarUrl = avatarCid
      ? gatewayUrl(avatarCid)
      : new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href;
    const prisma = getPrismaClient();
    await Promise.all([
      user.userAccount &&
        prisma.userAccount.update({
          where: { id: user.userAccount.id },
          data: {
            ...validatedFields.data,
            avatarUrl,
            userId: user.id,
          },
        }),
      !user.userAccount &&
        prisma.userAccount.create({
          data: {
            ...validatedFields.data,
            avatarUrl,
            userId: user.id,
          },
        }),
    ]);
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create user account.' };
  }
  redirect(creatorAccountSlug ? `/user/creators/${creatorAccountSlug}` : '/user');
};

export const updateUserAccount = async (
  role: 'creator' | 'user',
  prevState: {
    errors?: {
      username?: string[];
      interests?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.userAccount) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = UserAccountSchema.omit({
    id: true,
    avatarUrl: true,
  }).safeParse({
    username: formData.get('username'),
    interests: formData.getAll('interests').map((interest) => Number(interest)),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    const avatar = formData.get('avatar') as File;
    const avatarCid = avatar.size > 0 ? await nftStorage.storeBlob(avatar) : null;
    const avatarUrl = avatarCid ? gatewayUrl(avatarCid) : user.userAccount.avatarUrl;
    await getPrismaClient().userAccount.update({
      where: { id: user.userAccount.id },
      data: {
        ...validatedFields.data,
        avatarUrl,
        userId: user.id,
      },
    });
    revalidatePath(`/${role}/profile`);
    return { message: 'Updated user account.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update user account.' };
  }
};

export const updateBannerAndAvatar = async (prevState: { message: string }, formData: FormData) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  try {
    const banner = formData.get('banner') as File;
    const avatar = formData.get('avatar') as File;
    const [bannerCid, avatarCid] = await Promise.all([
      banner.size > 0 ? await nftStorage.storeBlob(banner) : null,
      avatar.size > 0 ? await nftStorage.storeBlob(avatar) : null,
    ]);
    const bannerUrl = bannerCid ? gatewayUrl(bannerCid) : user.creatorAccount.bannerUrl;
    const avatarUrl = avatarCid ? gatewayUrl(avatarCid) : user.creatorAccount.avatarUrl;
    await getPrismaClient().creatorAccount.update({
      where: { userId: user.id },
      data: { bannerUrl, avatarUrl },
    });
    revalidatePath('/creator');
    return { message: 'Updated banner and avatar.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update banner and avatar.' };
  }
};

export const updateCard = async (
  tier: CardTierName,
  prevState: {
    errors?: {
      color?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = CardSchema.omit({ logoUrl: true }).safeParse({
    color: formData.get('color'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    const logo = formData.get('logo') as File;
    const cards = user.creatorAccount.cards as Cards;
    const logoCid = logo.size > 0 ? await nftStorage.storeBlob(logo) : null;
    const logoUrl = logoCid ? gatewayUrl(logoCid) : cards[tier].logoUrl;
    cards[tier] = { logoUrl, color: validatedFields.data.color };
    await getPrismaClient().creatorAccount.update({
      where: { userId: user.id },
      data: { cards },
    });
    revalidatePath(`/creator/cards${tier === 'free' ? '' : `/${tier}`}`);
    return { message: 'Updated card.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update card.' };
  }
};

export const createPost = async (
  prevState: {
    errors?: {
      videoUrl?: string[];
      title?: string[];
      description?: string[];
      tier?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = PostSchema.omit({
    id: true,
    date: true,
    creatorAccountId: true,
  }).safeParse({
    videoUrl: formData.get('video-url'),
    title: formData.get('title'),
    description: formData.get('description'),
    tier: formData.get('tier'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    await getPrismaClient().post.create({
      data: {
        ...validatedFields.data,
        creatorAccountId: user.creatorAccount.id,
      },
    });
    revalidatePath('/creator');
    return { message: 'Created post.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create post.' };
  }
};

export const updateDescription = async (
  prevState: {
    errors?: {
      description?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = CreatorAccountSchema.omit({
    id: true,
    slug: true,
    title: true,
    avatarUrl: true,
    bannerUrl: true,
    interests: true,
    cards: true,
  }).safeParse({
    description: formData.get('description'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    await getPrismaClient().creatorAccount.update({
      where: { userId: user.id },
      data: validatedFields.data,
    });
    revalidatePath('/creator/about');
    return { message: 'Updated description.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update description.' };
  }
};

export const createExclusivity = async (
  prevState: {
    errors?: {
      title?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = ExclusivitySchema.omit({
    id: true,
    description: true,
    imageUrl: true,
    price: true,
    totalSupply: true,
    creatorAccountId: true,
  }).safeParse({
    title: formData.get('title'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  let exclusivityId = '';
  try {
    const exclusivity = await getPrismaClient().exclusivity.create({
      data: {
        ...validatedFields.data,
        creatorAccountId: user.creatorAccount.id,
      },
    });
    revalidatePath('/creator/exclusivities');
    exclusivityId = exclusivity.id;
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create exclusivity.' };
  }
  redirect(`/creator/exclusivities/${exclusivityId}`);
};

export const updateExclusivity = async (
  exclusivityId: string,
  prevState: {
    errors?: {
      title?: string[];
      description?: string[];
      price?: string[];
      totalSupply?: string[];
    };
    message: string;
  },
  formData: FormData,
) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return { message: 'Unauthorized.' };
  }
  const exclusivity = user.creatorAccount.exclusivities.find(({ id }) => id === exclusivityId);
  if (!exclusivity) {
    return { message: 'Unauthorized.' };
  }
  const validatedFields = ExclusivitySchema.omit({
    id: true,
    imageUrl: true,
    creatorAccountId: true,
  }).safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    totalSupply: formData.get('total-supply'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to validate data.',
    };
  }
  try {
    const image = formData.get('image') as File;
    const imageCid = image.size > 0 ? await nftStorage.storeBlob(image) : null;
    const imageUrl = imageCid ? gatewayUrl(imageCid) : exclusivity.imageUrl;
    await getPrismaClient().exclusivity.update({
      where: { id: exclusivityId },
      data: {
        ...validatedFields.data,
        imageUrl,
      },
    });
    revalidatePath(`/creator/exclusivities/${exclusivityId}`);
    return { message: 'Updated exclusivity.' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to update exclusivity.' };
  }
};

export const setExclusivityTokenId = async (exclusivityId: string, tokenId: string) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    throw new Error('Unauthorized.');
  }
  const exclusivity = user.creatorAccount.exclusivities.find(({ id }) => id === exclusivityId);
  if (!exclusivity) {
    throw new Error('Unauthorized.');
  }
  await getPrismaClient().exclusivity.update({
    where: { id: exclusivityId },
    data: { tokenId },
  });
  redirect('/creator/exclusivities');
};
