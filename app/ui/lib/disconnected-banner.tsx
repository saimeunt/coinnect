'use client';
import { useAccount } from 'wagmi';
import { useIsClient } from 'usehooks-ts';

import ConnectButton from '@/app/ui/lib/connect-wallet-wizard/connect-button';
import { truncateAddress } from '@/app/lib/utils';

const DisconnectedBanner = ({ address }: { address: `0x${string}` }) => {
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  return (
    isClient &&
    isDisconnected && (
      <div className="flex items-center justify-between gap-x-6 bg-red-100 px-6 py-2.5 sm:pr-3.5 lg:pl-8">
        <p className="text-sm leading-6">
          Please connect your Web3 wallet associated with {truncateAddress(address)} to interact
          with Coinnect.
        </p>
        <ConnectButton />
      </div>
    )
  );
};

export default DisconnectedBanner;
