import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs';
import { isEqual, omit } from 'lodash';

import Tabs from '../../../components/lib/tabs';
import { UserPublicMetadata } from '../../../lib/types';
import { getCreatorAccountByName } from '../../../lib/contracts/accounts/contract';
import UnpublishedBanner from '../../../components/lib/creator-page/unpublished-banner';

const CreatorCardsLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  const userCreatorAccount = publicMetadata.creatorAccount;
  if (!userCreatorAccount) {
    return null;
  }
  const creatorAccount = await getCreatorAccountByName(userCreatorAccount.name);
  const published = isEqual(
    omit(userCreatorAccount, 'oboleId', 'userId'),
    omit(creatorAccount, 'oboleId', 'userId'),
  );
  return (
    <>
      {!published && (
        <UnpublishedBanner
          create={creatorAccount.name === '\x00'}
          creatorAccount={userCreatorAccount}
        />
      )}
      <div className="m-4">
        <h2 className="text-xl font-bold leading-7">Cards</h2>
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
