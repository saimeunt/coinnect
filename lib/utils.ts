import { hexToString } from 'viem';
import { RawMembership } from './types';

export const rawMembershipToMembership = (rawMembership: RawMembership) => {
  return {
    ...rawMembership,
    name: hexToString(rawMembership.name, { size: 32 }),
    interests: [0],
  };
};

export const membershipUrl = (name: string) => {
  const scheme = `http${process.env.NODE_ENV !== 'production' ? '' : 's'}`;
  return new URL(`/${name}`, `${scheme}://${process.env.VERCEL_URL}`);
};
