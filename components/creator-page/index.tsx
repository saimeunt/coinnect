import { currentUser } from '@clerk/nextjs';
// import { currentUser } from '../../lib/utils';

import { CreatorAccount, UserPublicMetadata, UserPrivateMetadata } from '../../lib/types';
// import CreatorPage from './creator-page';
import PostsList from '../lib/creator-page/posts-list';

const CreatorPageIndex = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  if (!publicMetadata.creatorAccount) {
    return null;
  }
  const creatorAccount = publicMetadata.creatorAccount as CreatorAccount;
  const privateMetadata = user.privateMetadata as UserPrivateMetadata;
  const posts = privateMetadata.posts || [];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8">
        <PostsList
          creatorAccount={creatorAccount}
          posts={posts}
          user={{ fullName: `${user.firstName} ${user.lastName}` }}
        />
      </div>
    </div>
  );
};

export default CreatorPageIndex;
