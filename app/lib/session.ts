import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { zeroAddress } from 'viem';

type SessionData = {
  isLoggedIn: boolean;
  address: `0x${string}`;
};

const defaultSession: SessionData = {
  isLoggedIn: false,
  address: zeroAddress,
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: 'coinnect',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.address = defaultSession.address;
  }
  return session;
};

export const isLoggedIn = async () => {
  const session = await getSession();
  return session.isLoggedIn;
};

export const currentAddress = async () => {
  const session = await getSession();
  return session.address;
};
