'use client';
import { useRouter } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CircleStackIcon } from '@heroicons/react/20/solid';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { useAccountPayoutsAmount } from '../lib/hooks';
import { useWithdraw } from '../../lib/contracts/tokens/contract';
import { formatCurrency } from '../../lib/utils';

const Payouts = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const { isConnected } = useAccount();
  const payoutsAmount = useAccountPayoutsAmount();
  const { data, withdraw } = useWithdraw();
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => router.refresh(),
  });
  return (
    isClient && (
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 text-center sm:p-6">
          <BanknotesIcon className="mx-auto mt-4 h-12 w-12 text-gray-400" aria-hidden="true" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {payoutsAmount === 0 ? 'No' : formatCurrency(payoutsAmount)} outstanding payment
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {payoutsAmount === 0 ? 'No donations yet.' : 'Withdraw donations to your account now.'}
          </p>
          <div className="mt-6 flex justify-center">
            {isConnected ? (
              payoutsAmount > 0 && (
                <button
                  type="button"
                  className={clsx(
                    'inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    {
                      'bg-indigo-300': !isConnected || isLoading,
                      'bg-indigo-600 hover:bg-indigo-500': isConnected && !isLoading,
                    },
                  )}
                  onClick={withdraw}
                >
                  <CircleStackIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Withdraw{isLoading && 'ing'} {formatCurrency(payoutsAmount)}
                  {isLoading && '…'}
                </button>
              )
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Payouts;
