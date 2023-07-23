'use client';
import { useRouter } from 'next/navigation';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { useAccount, useWaitForTransaction } from 'wagmi';
import clsx from 'clsx';

import { useMintMembershipCard } from '../../../lib/contracts/tokens/contract';

const JoinButton = ({ name }: { name: string }) => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { data, mintMembershipCard } = useMintMembershipCard(name);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => router.refresh(),
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
      onClick={mintMembershipCard}
    >
      <UserPlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Join{isLoading && 'ing'} community{isLoading && '…'}
    </button>
  );
};

export default JoinButton;
