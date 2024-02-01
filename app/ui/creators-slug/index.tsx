import { notFound } from 'next/navigation';

import { getUserByCreatorAccountId } from '@/app/lib/models/user';
import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import PostsList from '@/app/ui/lib/creator-page/posts-list';

const CreatorsSlug = async ({ slug }: { slug: string }) => {
  const creatorAccount = await creatorAccountBySlug(slug);
  if (!creatorAccount) {
    notFound();
  }
  const user = await getUserByCreatorAccountId(creatorAccount.id);
  if (!user || !user.userAccount || !user.creatorAccount) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8">
        <PostsList
          userAccount={user.userAccount}
          creatorAccount={user.creatorAccount}
          posts={user.creatorAccount.posts.filter(({ tier }) => tier === 'public')}
        />
      </div>
    </div>
  );
};

export default CreatorsSlug;
