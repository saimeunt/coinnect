import { type UserAccount } from '@/app/lib/models/user-account';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type Post } from '@/app/lib/models/post';
import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';
import PostsList from '@/app/ui/lib/creator-page/posts-list';

const filterPosts = (posts: Post[], membershipCard: MembershipCardData | null) => {
  if (!membershipCard) {
    return posts.filter(({ tier }) => tier === 'public');
  }
  if (membershipCard.tier === 'free') {
    return posts.filter((post) => ['public', 'free'].includes(post.tier));
  }
  const now = Math.floor(Date.now() / 1000);
  const tiers = {
    free: ['public', 'free'],
    standard: ['public', 'free', 'standard'],
    premium: ['public', 'free', 'standard', 'premium'],
  };
  return posts.filter(
    (post) =>
      tiers[membershipCard.tier].includes(post.tier) &&
      now < Number(membershipCard.subscriptionEndTimestamp),
  );
};

const UserPostsList = ({
  userAccount,
  creatorAccount,
  membershipCard,
}: {
  userAccount: UserAccount;
  creatorAccount: CreatorAccount;
  membershipCard: MembershipCardData | null;
}) => (
  <PostsList
    creatorAccount={creatorAccount}
    posts={filterPosts(creatorAccount.posts, membershipCard)}
    userAccount={userAccount}
  />
);

export default UserPostsList;
