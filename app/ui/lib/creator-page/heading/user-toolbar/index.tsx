'use client';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type UserAccount } from '@/app/lib/models/user-account';
import JoinButton from '@/app/ui/lib/creator-page/heading/user-toolbar/join-button';
import DonateButton from '@/app/ui/lib/creator-page/heading/user-toolbar/donate-button';
import ClaimButton from '@/app/ui/lib/creator-page/heading/user-toolbar/claim-button';
import type { MembershipCardData } from '@/app/lib/contracts/coinnect/types';

const UserToolbar = ({
  creatorAccount,
  userAccount,
  membershipCard,
  userRewardsAmount,
}: {
  creatorAccount: CreatorAccount;
  userAccount: UserAccount;
  membershipCard?: MembershipCardData | null;
  userRewardsAmount?: bigint;
}) =>
  membershipCard ? (
    <>
      {userRewardsAmount && userRewardsAmount > 0n && (
        <ClaimButton creatorAccountId={creatorAccount.id} userRewardsAmount={userRewardsAmount} />
      )}
      <DonateButton />
    </>
  ) : (
    <JoinButton creatorAccountId={creatorAccount.id} userAccount={userAccount} />
  );

export default UserToolbar;
