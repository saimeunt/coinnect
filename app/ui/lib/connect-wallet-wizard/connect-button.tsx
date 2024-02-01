'use client';
import { WalletIcon } from '@heroicons/react/16/solid';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { Button } from '@/components/button';

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  return (
    <Button color="indigo" onClick={() => open()}>
      <WalletIcon />
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;
