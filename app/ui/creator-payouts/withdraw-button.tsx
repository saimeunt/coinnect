'use client';
import { useRouter } from 'next/navigation';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { CircleStackIcon } from '@heroicons/react/16/solid';
import { useIsClient, useUpdateEffect } from 'usehooks-ts';

import { useWithdraw } from '@/app/lib/contracts/coinnect/contract';
import { formatUSDC } from '@/app/lib/utils';
import { Button } from '@/components/button';

const WithdrawButton = ({ userPayoutsAmount }: { userPayoutsAmount: bigint }) => {
  const router = useRouter();
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  const { hash, withdraw } = useWithdraw();
  const { isLoading, isFetched } = useWaitForTransactionReceipt({ hash });
  useUpdateEffect(() => router.refresh(), [isFetched]);
  return (
    isClient &&
    userPayoutsAmount > 0n && (
      <Button color="indigo" disabled={isDisconnected || isLoading} onClick={withdraw}>
        <CircleStackIcon />
        Withdraw{isLoading && 'ing'} {formatUSDC(userPayoutsAmount)}
        {isLoading && '…'}
      </Button>
    )
  );
};

export default WithdrawButton;
