'use client';
// import { useRouter, useSearchParams } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { RocketLaunchIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { type UserAccount } from '@/app/lib/models/user-account';
import { useCreateUserAccount } from '@/app/lib/contracts/coinnect/contract';
import ConnectButton from '@/app/ui/lib/connect-wallet-wizard/connect-button';

const PublishAccount = ({ userAccount }: { userAccount: UserAccount }) => {
  // const searchParams = useSearchParams();
  const isClient = useIsClient();
  const { isConnected } = useAccount();
  // const router = useRouter();
  const { hash, createUserAccount } = useCreateUserAccount(userAccount);
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
    /* onSuccess: () => {
      const creator = searchParams.get('creator');
      router.push(creator ? `/user/creators/${creator}` : '/user');
    }, */
  });
  return (
    <div>
      <div className="text-center">
        <h3 className="mt-2 text-xl font-semibold text-gray-900">Publish your account</h3>
        <p className="mt-1 text-sm text-gray-500">
          {isClient && isConnected
            ? 'You must now publish your account on the blockchain to follow creators and join memberships.'
            : 'You must connect your Web3 wallet to finish creating your account.'}
        </p>
        <div className="mt-4 flex justify-center">
          {isClient && isConnected ? (
            <button
              type="button"
              disabled={isLoading}
              className={clsx(
                'inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                {
                  'bg-indigo-300': isLoading,
                  'bg-indigo-600 hover:bg-indigo-500': !isLoading,
                },
              )}
              onClick={createUserAccount}
            >
              <RocketLaunchIcon className="-ml-0.5 size-5" aria-hidden="true" />
              Publish{isLoading && 'ing…'}
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishAccount;
