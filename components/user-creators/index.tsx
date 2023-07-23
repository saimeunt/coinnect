'use client';
import { useIsClient } from 'usehooks-ts';

import { useAccountMembershipCards } from '../lib/hooks';
import MembershipCardsList from './membership-cards-list';

const UserCreators = () => {
  const isClient = useIsClient();
  const { membershipCards } = useAccountMembershipCards();
  return (
    <div className="m-4">
      <h2 className="mb-4 text-xl font-bold leading-7">My membership cards</h2>
      {isClient && <MembershipCardsList membershipCards={membershipCards} />}
    </div>
  );
};

export default UserCreators;
