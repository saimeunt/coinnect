'use client';
import { useRouter } from 'next/navigation';
import { RocketLaunchIcon } from '@heroicons/react/20/solid';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { useIsClient } from 'usehooks-ts';
import clsx from 'clsx';

import {
  useCreateCreatorAccount,
  useUpdateCreatorAccount,
} from '../../../lib/contracts/accounts/contract';
import { CreatorAccount } from '../../../lib/types';

const UnpublishedBanner = ({
  create,
  creatorAccount,
}: {
  create: boolean;
  creatorAccount: CreatorAccount;
}) => {
  const isClient = useIsClient();
  const { isConnected } = useAccount();
  const router = useRouter();
  const { data: createCreatorAccountData, createCreatorAccount } = useCreateCreatorAccount(
    creatorAccount,
    create,
  );
  const { data: updateCreatorAccountData, updateCreatorAccount } = useUpdateCreatorAccount(
    creatorAccount,
    !create,
  );
  const { isLoading } = useWaitForTransaction({
    hash: createCreatorAccountData?.hash || updateCreatorAccountData?.hash,
    onSuccess: () => {
      // openNotification(true);
      router.refresh();
    },
  });
  return (
    <div className="flex items-center justify-between gap-x-6 bg-indigo-100 px-6 py-2.5 sm:pr-3.5 lg:pl-8">
      <p className="text-sm leading-6">
        Your page {create ? 'is not yet published.' : 'has unsaved changes.'}
      </p>
      {isClient && (
        <button
          type="button"
          disabled={!isConnected || isLoading}
          className={clsx(
            'inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            {
              'bg-indigo-300': !isConnected || isLoading,
              'bg-indigo-600 hover:bg-indigo-500': isConnected && !isLoading,
            },
          )}
          onClick={create ? createCreatorAccount : updateCreatorAccount}
        >
          <RocketLaunchIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Publish{isLoading && 'ing…'}
        </button>
      )}
    </div>
  );
};

export default UnpublishedBanner;
