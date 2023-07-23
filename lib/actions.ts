'use server';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs';
import { Web3Storage } from 'web3.storage';
import { revalidatePath } from 'next/cache';

import { baseUrl, defaultCreatorAccount, defaultUserAccount } from './utils';
import { interests } from './constants';
import { UserPublicMetadata, UserPrivateMetadata, CardTierName, PostTierName } from './types';

const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });

export const createCreatorAccount = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const interestsIds = interests.reduce<number[]>((result, { id }) => {
    const hasInterest = formData.get(`interests-${id}`) === 'on';
    return hasInterest ? [...result, id] : result;
  }, []);
  const [, userIdRaw] = userId.split('_');
  const creatorAccount = {
    ...defaultCreatorAccount(),
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    interests: interestsIds,
    userId: userIdRaw,
  };
  await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { creatorAccount } });
  redirect('/creator/page');
};

export const createUserAccount = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const interestsIds = interests.reduce<number[]>((result, { id }) => {
    const hasInterest = formData.get(`interests-${id}`) === 'on';
    return hasInterest ? [...result, id] : result;
  }, []);
  const [, userIdRaw] = userId.split('_');
  const userAccount = {
    ...defaultUserAccount(),
    username: formData.get('username') as string,
    avatarUrl: new URL(formData.get('avatar-url') as string, baseUrl()).href,
    interests: interestsIds,
    userId: userIdRaw,
  };
  await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { userAccount } });
  revalidatePath('/new-user');
};

const gatewayUrl = (cid: string, path: string) =>
  `https://${cid}.ipfs.w3s.link/${encodeURIComponent(path)}`;

export const updateCard = async (formData: FormData, tier: CardTierName) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const logo = formData.get('logo') as File;
  const color = formData.get('color') as string;
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  const creatorAccount = publicMetadata.creatorAccount || defaultCreatorAccount();
  const cid = logo.size > 0 ? await web3Storage.put([logo], { name: logo.name }) : null;
  const logoUrl = cid ? gatewayUrl(cid, logo.name) : creatorAccount.cards[tier].logoUrl;
  creatorAccount.cards[tier] = { logoUrl, color: Number(color) };
  await clerkClient.users.updateUserMetadata(user.id, { publicMetadata: { creatorAccount } });
  revalidatePath(`/creator/cards${tier === 'free' ? '' : `/${tier}`}`);
};

export const createPost = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const privateMetadata = user.privateMetadata as UserPrivateMetadata;
  const posts = privateMetadata.posts || [];
  posts.push({
    videoUrl: formData.get('video-url') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tier: formData.get('tier') as PostTierName,
    date: new Date().toISOString(),
  });
  await clerkClient.users.updateUserMetadata(user.id, { privateMetadata: { posts } });
  revalidatePath('/creator/page');
};

export const updateDescription = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  const creatorAccount = publicMetadata.creatorAccount || defaultCreatorAccount();
  creatorAccount.description = formData.get('description') as string;
  await clerkClient.users.updateUserMetadata(user.id, { publicMetadata: { creatorAccount } });
  revalidatePath('/creator/page/about');
};
