import { type ReactNode } from 'react';

import Tabs from '@/app/ui/lib/tabs';
import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import UnpublishedBanner from '@/app/ui/lib/creator-page/unpublished-banner';
import { currentUser, isCreatorAccountPublished } from '@/app/lib/models/user';

const CreatorCardsLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return null;
  }
  const creatorAccount = await creatorAccountBySlug(user.creatorAccount.slug);
  const published = isCreatorAccountPublished(user.creatorAccount, creatorAccount);
  return (
    <>
      {!published && (
        <UnpublishedBanner unpublished={!creatorAccount} creatorAccount={user.creatorAccount} />
      )}
      <div className="m-4">
        <h2 className="text-xl font-bold leading-7">My membership cards</h2>
        <Tabs
          tabs={[
            { name: 'Free membership', href: '/creator/cards' },
            { name: 'Standard membership', href: '/creator/cards/standard' },
            { name: 'Premium membership', href: '/creator/cards/premium' },
          ]}
        />
        {children}
      </div>
    </>
  );
};

export default CreatorCardsLayout;
