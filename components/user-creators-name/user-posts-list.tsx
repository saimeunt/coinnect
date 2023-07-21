'use client';

import { CreatorAccount, MembershipCardNft, Post } from '../../lib/types';
import PostsList from '../lib/creator-page/posts-list';
import { useMembershipCard } from '../lib/hooks';

const filterPosts = (posts: Post[], membershipCard?: MembershipCardNft) => {
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
      now < membershipCard.subscriptionEndTimestamp,
  );
};

const UserPostsList = ({
  creatorAccount,
  posts,
  user,
}: {
  creatorAccount: CreatorAccount;
  posts: Post[];
  user: { fullName: string };
}) => {
  const { membershipCard } = useMembershipCard(creatorAccount.name);
  return (
    <PostsList
      creatorAccount={creatorAccount}
      posts={filterPosts(posts, membershipCard)}
      user={user}
    />
  );
};

export default UserPostsList;
