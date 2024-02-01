import { IdentificationIcon } from '@heroicons/react/20/solid';

import ConnectButton from '@/app/ui/lib/connect-wallet-wizard/connect-button';

const ConnectWallet = () => (
  <div className="text-center">
    <IdentificationIcon className="mx-auto mt-4 size-12 text-gray-400" aria-hidden="true" />
    <h3 className="mt-2 text-sm font-semibold text-gray-900">Connect your wallet</h3>
    <p className="mt-1 text-sm text-gray-500">You must connect your Web3 wallet to login.</p>
    <div className="mt-6 flex justify-center">
      <ConnectButton />
    </div>
  </div>
);

export default ConnectWallet;
