import { currentUser } from '@clerk/nextjs';

import { UserPublicMetadata } from '../../lib/types';
import PublishAccount from './publish-account';
// import CreateUserAccount from './create-user-account';
import NewUserAccount from './new-user-account';

const NewUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const publicMetadata = user.publicMetadata as UserPublicMetadata;
  const userAccount = publicMetadata.userAccount;
  if (userAccount) {
    return <PublishAccount userAccount={userAccount} />;
  }
  return <NewUserAccount />;
};

export default NewUser;
