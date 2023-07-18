import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient, redirectToSignIn } from '@clerk/nextjs';

import { UserPublicMetadata } from '../../../lib/types';

export const GET = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  const signUp = req.nextUrl.searchParams.get('sign-up');
  const role = req.nextUrl.searchParams.get('role');
  if (signUp === 'true') {
    if (role === 'creator') {
      return NextResponse.redirect(new URL('/new-creator', req.url));
    }
    const creator = req.nextUrl.searchParams.get('creator');
    return NextResponse.redirect(new URL(`/new-user?creator=${creator}`, req.url));
  }
  const user = await clerkClient.users.getUser(userId);
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  if (publicMetadata.creatorAccount) {
    return NextResponse.redirect(new URL('/creator', req.url));
  }
  return NextResponse.redirect(new URL('/user', req.url));
};
