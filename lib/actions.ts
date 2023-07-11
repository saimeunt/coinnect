'use server';
import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs';

import { interests } from './constants';

export const createMembership = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const interestIds = interests.reduce<number[]>((result, { id }) => {
    const hasInterest = formData.get(`interests-${id}`) === 'on';
    return hasInterest ? [...result, id] : result;
  }, []);
  const membership = {
    name: formData.get('name'),
    title: formData.get('title'),
    interestIds,
    synced: false,
  };
  await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { membership, posts: [] } });
  redirect(`/creator/${membership.name}`);
};
