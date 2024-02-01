'use client';
import { useRouter } from 'next/navigation';
import { GiftIcon } from '@heroicons/react/16/solid';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useIsClient, useUpdateEffect } from 'usehooks-ts';

import { useClaimRewards } from '@/app/lib/contracts/coinnect/contract';
import { Button } from '@/components/button';
import { formatObol } from '@/app/lib/utils';

const ClaimButton = ({
  creatorAccountId,
  userRewardsAmount,
}: {
  creatorAccountId: string;
  userRewardsAmount: bigint;
}) => {
  const isClient = useIsClient();
  const router = useRouter();
  const { isDisconnected } = useAccount();
  const { hash, claimRewards } = useClaimRewards(creatorAccountId);
  const { isLoading, isFetched } = useWaitForTransactionReceipt({ hash });
  useUpdateEffect(() => router.refresh(), [isFetched]);
  return (
    isClient && (
      <Button color="indigo" disabled={isLoading || isDisconnected} onClick={claimRewards}>
        <GiftIcon />
        Claim{isLoading && 'ing'} {formatObol(userRewardsAmount)} $OBOL{isLoading && '…'}
      </Button>
    )
  );
};

export default ClaimButton;
