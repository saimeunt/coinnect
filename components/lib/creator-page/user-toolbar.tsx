'use client';

import { CreatorAccount } from '../../../lib/types';
import { useAccountRewardsAmount, useMembershipCard } from '../hooks';
import JoinButton from './join-button';
import DonateButton from './donate-button';
import ClaimButton from './claim-button';

const UserToolbar = ({ creatorAccount }: { creatorAccount: CreatorAccount }) => {
  const { membershipCard } = useMembershipCard(creatorAccount.name);
  const rewardsAmount = useAccountRewardsAmount(creatorAccount.name);
  // console.log(rewardsAmount);
  return membershipCard ? (
    <>
      {rewardsAmount >= 0.0001 && (
        <ClaimButton name={creatorAccount.name} rewardsAmount={rewardsAmount} />
      )}
      <DonateButton />
    </>
  ) : (
    <JoinButton name={creatorAccount.name} />
  );
};

export default UserToolbar;
