import { type ReactNode } from 'react';

import { currentUser,  } from '@/app/lib/models/user';
import {isCreatorAccountPublished}from '@/app/lib/models/creator-account';
import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import UnpublishedBanner from '@/app/ui/lib/creator-page/unpublished-banner';
import HeadingForm from '@/app/ui/lib/creator-page/heading-form';
import Tabs from '@/app/ui/lib/tabs';
import CreatePostDialog from '@/app/ui/creator-page/create-post-dialog';
import SharePageDialog from '@/app/ui/creator-page/share-page-dialog';

const CreatorPageLayout = async ({ children }: { children: ReactNode }) => {
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
      <HeadingForm unpublished={!creatorAccount} creatorAccount={user.creatorAccount} />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: '/creator' },
            { name: 'Membership', href: '/creator/membership' },
            { name: 'About', href: '/creator/about' },
          ]}
          centered
        />
      </div>
      {children}
      <CreatePostDialog />
      <SharePageDialog slug={user.creatorAccount.slug} />
    </>
  );
};

export default CreatorPageLayout;
