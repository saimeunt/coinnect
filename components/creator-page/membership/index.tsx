import { currentUser } from '@clerk/nextjs';

import { UserPublicMetadata } from '../../../lib/types';
import TiersList from '../../lib/creator-page/tiers-list';

const CreatorPageMembership = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  if (!publicMetadata.creatorAccount) {
    return null;
  }
  // const creatorAccount = publicMetadata.creatorAccount as CreatorAccount;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <TiersList />
      </div>
    </div>
  );
};

export default CreatorPageMembership;
