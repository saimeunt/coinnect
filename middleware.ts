import { NextRequest, NextResponse } from 'next/server';

import { isLoggedIn } from '@/app/lib/session';
// import { currentUser } from '@/app/lib/models/user';

const middleware = async (request: NextRequest) => {
  /* // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('ngrok-skip-browser-warning', 'true');
  request.headers.set('ngrok-skip-browser-warning', 'true');
  return NextResponse.next({
    // request: { headers: requestHeaders },
    request,
  }); */
  // response.cookies.set('ngrok-skip-browser-warning', 'true');
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    if (request.nextUrl.pathname.startsWith('/creators')) {
      return NextResponse.redirect(
        new URL(`/user${request.nextUrl.pathname}`, process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
  } else {
    if (!request.nextUrl.pathname.startsWith('/creators')) {
      return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_BASE_URL));
    }
  }
  /* if (loggedIn) {
    const user = await currentUser();
    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`);
    }
    if (request.nextUrl.pathname === '/auth/login') {
      return NextResponse.redirect(
        user.creatorAccount
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/creator`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      );
    } else if (request.nextUrl.pathname === '/new-creator') {
      if (user.creatorAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/creator`);
      }
    } else if (request.nextUrl.pathname === '/new-user') {
      if (user.userAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
      }
    } else if (request.nextUrl.pathname.startsWith('/creator')) {
      if (!user.creatorAccount && user.userAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
      }
      if (!user.userAccount && !user.creatorAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/new-creator`);
      }
    } else if (request.nextUrl.pathname.startsWith('/user')) {
      if (!user.userAccount && user.creatorAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/creator`);
      }
      if (!user.creatorAccount && !user.userAccount) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/new-user`);
      }
    }
  } else {
    if (request.nextUrl.pathname !== '/auth/login') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`);
    }
  } */
  return NextResponse.next();
};

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ['/creators/:path*', '/creator/:path*', '/user/:path*'],
  // matcher: ['/auth/login', '/new-creator', '/new-user', '/creator/:path*', '/user/:path*'],
};

export default middleware;
