import { orderBy } from 'lodash';

import { type UserAccount } from '@/app/lib/models/user-account';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type Post as PostModel } from '@/app/lib/models/post';
import Post from '@/app/ui/lib/creator-page/post';

const PostsList = ({
  creatorAccount,
  posts,
  userAccount,
}: {
  creatorAccount: CreatorAccount;
  posts: PostModel[];
  userAccount: UserAccount;
}) =>
  posts.length === 0 ? (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <p className="text-lg leading-8 text-gray-600">There&apos;s no posts yet.</p>
      </div>
    </div>
  ) : (
    <div className="space-y-8">
      {orderBy(posts, 'date', 'desc').map((post) => (
        <Post
          key={post.videoUrl}
          post={post}
          author={{
            title: creatorAccount.title,
            avatarUrl: creatorAccount.avatarUrl,
            username: userAccount.username,
          }}
        />
      ))}
    </div>
  );

export default PostsList;
