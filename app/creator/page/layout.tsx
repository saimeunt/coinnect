import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs';
import { isEqual, omit } from 'lodash';
// import { currentUser } from '../../../lib/utils';

import { getCreatorAccountByName } from '../../../lib/contracts/accounts/contract';
import { UserPublicMetadata } from '../../../lib/types';
import UnpublishedBanner from '../../../components/lib/creator-page/unpublished-banner';
import Heading from '../../../components/lib/creator-page/heading';
import Tabs from '../../../components/lib/tabs';
import CreatePostModal from '../../../components/creator-page/create-post-modal';

const CreatorPageLayout = async ({ children }: { children: ReactNode }) => {
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
      <Heading creatorAccount={userCreatorAccount} role="creator" />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: '/creator/page' },
            { name: 'Membership', href: '/creator/page/membership' },
            { name: 'About', href: '/creator/page/about' },
          ]}
          centered
        />
      </div>
      {children}
      <CreatePostModal />
    </>
  );
};

export default CreatorPageLayout;
