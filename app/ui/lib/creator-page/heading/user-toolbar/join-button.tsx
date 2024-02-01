'use client';
import { useRouter } from 'next/navigation';
import { UserPlusIcon } from '@heroicons/react/16/solid';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useIsClient, useUpdateEffect } from 'usehooks-ts';

import { useMintMembershipCard } from '@/app/lib/contracts/coinnect/contract';
import { type UserAccount } from '@/app/lib/models/user-account';
import { Button } from '@/components/button';

const JoinButton = ({
  creatorAccountId,
  userAccount,
  disabled,
}: {
  creatorAccountId: string;
  userAccount: UserAccount;
  disabled?: boolean;
}) => {
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  const router = useRouter();
  const { hash, mintMembershipCard } = useMintMembershipCard(creatorAccountId, userAccount);
  const { isLoading, isFetched } = useWaitForTransactionReceipt({ hash });
  useUpdateEffect(() => router.refresh(), [isFetched]);
  return (
    isClient && (
      <Button
        color="indigo"
        disabled={disabled || isDisconnected || isLoading}
        onClick={mintMembershipCard}
      >
        <UserPlusIcon />
        Join{isLoading && 'ing'} community{isLoading && '…'}
      </Button>
    )
  );
};

export default JoinButton;
