'use client';
// import { useIsClient } from 'usehooks-ts';
// import { useRouter } from 'next/navigation';
import { GiftIcon } from '@heroicons/react/20/solid';
import { useAccount, useWaitForTransaction } from 'wagmi';
import clsx from 'clsx';

import { useClaimRewards } from '../../../lib/contracts/tokens/contract';

const ClaimButton = ({ name, rewardsAmount }: { name: string; rewardsAmount: number }) => {
  // const isClient = useIsClient();
  const { isConnected } = useAccount();
  const { data, claimRewards } = useClaimRewards(name);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    // onSuccess: () => router.refresh(),
  });
  return (
    <button
      type="button"
      disabled={!isConnected || isLoading}
      className={clsx(
        'inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        {
          'bg-indigo-300': !isConnected || isLoading,
          'bg-indigo-600 hover:bg-indigo-500': isConnected && !isLoading,
        },
      )}
      onClick={claimRewards}
    >
      <GiftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Claim{isLoading && 'ing'} {rewardsAmount} $OBO{isLoading && '…'}
    </button>
  );
};

export default ClaimButton;
