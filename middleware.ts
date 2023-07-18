// import { NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn, clerkClient } from '@clerk/nextjs';

// import { Membership } from './lib/types';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/card-preview',
    '/api/membership-cards/:id',
    '/api/tokens/:id.json',
    '/creators/:name',
    '/creators/:name/about',
  ],
  /* async afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId) {
      const user = await clerkClient.users.getUser(auth.userId);
      if (user.publicMetadata.membership) {
        const membership = user.publicMetadata.membership as Membership;
        const redirectUrl = `/creator/${membership.name}`;
        if (req.nextUrl.pathname !== redirectUrl) {
          return NextResponse.redirect(new URL(redirectUrl, req.url));
        }
      } else if (req.nextUrl.pathname !== '/user') {
        return NextResponse.redirect(new URL('/user', req.url));
      }
    }
  }, */
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
