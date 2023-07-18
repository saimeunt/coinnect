import { currentUser } from '@clerk/nextjs';

import { UserPublicMetadata } from '../../lib/types';
import CardTier from './card-tier';

const CreatorCards = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  const creatorAccount = publicMetadata.creatorAccount;
  if (!creatorAccount) {
    return null;
  }
  return (
    <CardTier
      tier="free"
      user={{
        fullName: `${user.firstName} ${user.lastName}`,
        profileImageUrl: user.profileImageUrl,
        creatorAccount,
      }}
    />
  );
};

export default CreatorCards;
