import { currentUser } from '@clerk/nextjs';

import { CreatorAccount, UserPublicMetadata } from '../../../lib/types';
import About from './about';
import UpdateDescriptionModal from './update-description-modal';

const CreatorPageAbout = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  if (!publicMetadata.creatorAccount) {
    return null;
  }
  const creatorAccount = publicMetadata.creatorAccount as CreatorAccount;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <About creatorAccount={creatorAccount} />
      </div>
      <UpdateDescriptionModal description={creatorAccount.description} />
    </div>
  );
};

export default CreatorPageAbout;
