'use client';
import { useIsClient } from 'usehooks-ts';
import { useAccount } from 'wagmi';

import ConnectWallet from '@/app/ui/lib/connect-wallet-wizard/connect-wallet';
import SignWallet from '@/app/ui/lib/connect-wallet-wizard/sign-wallet';

const ConnectWalletWizard = () => {
  const isClient = useIsClient();
  const { address } = useAccount();
  return isClient && address ? <SignWallet /> : <ConnectWallet />;
};

export default ConnectWalletWizard;
