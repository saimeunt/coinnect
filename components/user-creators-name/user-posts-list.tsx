'use client';
import { useIsClient } from 'usehooks-ts';

import { CreatorAccount, TokenData, Post } from '../../lib/types';
import PostsList from '../lib/creator-page/posts-list';
import { useAccountMembershipCard } from '../lib/hooks';

const filterPosts = (posts: Post[], membershipCard?: TokenData) => {
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
  creatorAccount,
  posts,
  user,
}: {
  creatorAccount: CreatorAccount;
  posts: Post[];
  user: { fullName: string };
}) => {
  const isClient = useIsClient();
  const membershipCard = useAccountMembershipCard(creatorAccount.name);
  return (
    isClient && (
      <PostsList
        creatorAccount={creatorAccount}
        posts={filterPosts(posts, membershipCard)}
        user={user}
      />
    )
  );
};

export default UserPostsList;
