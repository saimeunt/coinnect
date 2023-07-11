import { currentUser } from '@clerk/nextjs';

import { Membership } from '../../lib/types';
import CreatorPage from './creator-page';

const CreatorPageIndex = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const draftMembership = user.publicMetadata.membership as Membership;
  return <CreatorPage membership={draftMembership} />;
};

export default CreatorPageIndex;
