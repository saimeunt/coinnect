import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient, redirectToSignIn } from '@clerk/nextjs';

import { Membership } from '../../../lib/types';

export const GET = async (req: NextRequest) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  const signUp = req.nextUrl.searchParams.get('signUp');
  const role = req.nextUrl.searchParams.get('role');
  if (signUp === 'true' && role === 'creator') {
    return NextResponse.redirect(new URL('/creator/new', req.url));
  }
  const user = await clerkClient.users.getUser(userId);
  if (user.publicMetadata.membership) {
    const membership = user.publicMetadata.membership as Membership;
    return NextResponse.redirect(new URL(`/creator/${membership.name}`, req.url));
  }
  return NextResponse.redirect(new URL('/user', req.url));
};
