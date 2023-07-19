import { notFound } from 'next/navigation';
import { clerkClient } from '@clerk/nextjs';

import { getCreatorAccountByName } from '../../lib/contracts/accounts/contract';
import { UserPrivateMetadata } from '../../lib/types';
import PostsList from '../lib/creator-page/posts-list';

const UserCreatorsName = async ({ name }: { name: string }) => {
  const creatorAccount = await getCreatorAccountByName(name);
  if (creatorAccount.name === '\x00') {
    notFound();
  }
  const user = await clerkClient.users.getUser(`user_${creatorAccount.userId}`);
  const privateMetadata = user.privateMetadata as UserPrivateMetadata;
  const posts = privateMetadata.posts || [];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8">
        <PostsList
          creatorAccount={creatorAccount}
          posts={posts.filter(({ tier }) => tier === 'public')}
          user={{ fullName: `${user.firstName} ${user.lastName}` }}
        />
      </div>
    </div>
  );
};

export default UserCreatorsName;
