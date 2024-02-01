import { currentUser } from '@/app/lib/models/user';
import PostsList from '@/app/ui/lib/creator-page/posts-list';

const CreatorPageIndex = async () => {
  const user = await currentUser();
  if (!user || !user.creatorAccount || !user.userAccount) {
    return null;
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8">
        <PostsList
          creatorAccount={user.creatorAccount}
          posts={user.creatorAccount.posts}
          userAccount={user.userAccount}
        />
      </div>
    </div>
  );
};

export default CreatorPageIndex;
