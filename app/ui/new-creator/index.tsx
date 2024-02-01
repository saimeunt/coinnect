import { isLoggedIn } from '@/app/lib/session';
import ConnectWalletWizard from '@/app/ui/lib/connect-wallet-wizard';
import NewCreatorAccount from '@/app/ui/new-creator/new-creator-account';

const NewCreator = async () => {
  const loggedIn = await isLoggedIn();
  return loggedIn ? <NewCreatorAccount /> : <ConnectWalletWizard />;
};

export default NewCreator;
