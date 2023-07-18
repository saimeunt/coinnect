'use client';
import { useIsClient } from 'usehooks-ts';
import { useAccount } from 'wagmi';

import ConnectWallet from './connect-wallet';
import NewUserAccount from './new-user-account';

const CreateUserAccount = () => {
  const isClient = useIsClient();
  const { isConnected } = useAccount();
  return isClient && isConnected ? <NewUserAccount /> : <ConnectWallet />;
};

export default CreateUserAccount;
