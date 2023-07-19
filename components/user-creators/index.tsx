'use client';
import { useIsClient } from 'usehooks-ts';
import { useAccount } from 'wagmi';

import Memberships from './memberships';

const UserCreators = () => {
  const isClient = useIsClient();
  const { address } = useAccount();
  return (
    <div className="m-4">
      <h2 className="mb-4 text-xl font-bold leading-7">My membership cards</h2>
      {isClient && address && <Memberships address={address} />}
    </div>
  );
};

export default UserCreators;
