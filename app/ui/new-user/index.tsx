import { currentUser } from '@/app/lib/models/user';
// import PublishAccount from '@/app/ui/new-user/publish-account';
// import CreateUserAccount from './create-user-account';
import ConnectWalletWizard from '@/app/ui/lib/connect-wallet-wizard';
import NewUserAccount from '@/app/ui/new-user/new-user-account';

const NewUser = async () => {
  const user = await currentUser();
  return user ? <NewUserAccount creatorAccount={user.creatorAccount} /> : <ConnectWalletWizard />;
  /* const user = await currentUser();
  if (!user) {
    return null;
  }
  if (user.userAccount) {
    return <PublishAccount userAccount={user.userAccount} />;
  }
  return <NewUserAccount />; */
};

export default NewUser;
