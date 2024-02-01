import { type ReactNode } from 'react';

import { balanceOf } from '@/app/lib/contracts/stablecoin/contract';
import { currentUser } from '@/app/lib/models/user';
import {
  creatorAccountBySlug,
  membershipCardByOwnerAndCreatorAccountId,
  obolBalanceOf,
  rewardsAmount,
} from '@/app/lib/contracts/coinnect/contract';
import Heading from '@/app/ui/lib/creator-page/heading';
import Tabs from '@/app/ui/lib/tabs';
import DonateDialog from '@/app/ui/lib/creator-page/donate-dialog';
import { notFound } from 'next/navigation';

const UserCreatorsSlugPageLayout = async ({
  params: { slug },
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const [user, creatorAccount] = await Promise.all([currentUser(), creatorAccountBySlug(slug)]);
  if (!user || !creatorAccount) {
    notFound();
  }
  const [membershipCard, userBalance, userObolBalance, userRewardsAmount] = await Promise.all([
    membershipCardByOwnerAndCreatorAccountId(user.address, creatorAccount.id),
    balanceOf(user.address),
    obolBalanceOf(user.address, creatorAccount.obolId),
    rewardsAmount(user.address, creatorAccount.id),
  ]);
  return (
    <>
      <Heading
        creatorAccount={creatorAccount}
        userAccount={user.userAccount}
        role="user"
        membershipCard={membershipCard}
        userObolBalance={userObolBalance}
        userRewardsAmount={userRewardsAmount}
      />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: `/user/creators/${slug}` },
            { name: 'Membership', href: `/user/creators/${slug}/membership` },
            { name: 'About', href: `/user/creators/${slug}/about` },
          ]}
          centered
        />
      </div>
      {children}
      <DonateDialog userBalance={userBalance} creatorAccountId={creatorAccount.id} />
    </>
  );
};

export default UserCreatorsSlugPageLayout;
