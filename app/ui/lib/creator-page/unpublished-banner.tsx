'use client';
import { useRouter } from 'next/navigation';
import { RocketLaunchIcon } from '@heroicons/react/16/solid';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useIsClient } from 'usehooks-ts';
import { useUpdateEffect } from 'usehooks-ts';

import { Button } from '@/components/button';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import {
  useCreateCreatorAccount,
  useUpdateCreatorAccount,
} from '@/app/lib/contracts/coinnect/contract';
import { setCreatorAccountObolId } from '@/app/lib/actions';

const UnpublishedBanner = ({
  unpublished,
  creatorAccount,
}: {
  unpublished: boolean;
  creatorAccount: CreatorAccount;
}) => {
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  const router = useRouter();
  const { hash: createCreatorAccountHash, createCreatorAccount } =
    useCreateCreatorAccount(creatorAccount);
  const { hash: updateCreatorAccountHash, updateCreatorAccount } =
    useUpdateCreatorAccount(creatorAccount);
  const { isLoading: createIsLoading, isFetched: createIsFetched } = useWaitForTransactionReceipt({
    hash: createCreatorAccountHash,
  });
  useUpdateEffect(() => router.refresh(), [createIsFetched]);
  const {
    data,
    isLoading: updateIsLoading,
    isFetched: updateIsFetched,
  } = useWaitForTransactionReceipt({ hash: updateCreatorAccountHash });
  useUpdateEffect(() => {
    if (!data) {
      return;
    }
    const setObolId = async (creatorAccountId: string, obolId: string) => {
      await setCreatorAccountObolId(creatorAccountId, obolId);
      router.refresh();
    };
    const [event] = data.logs;
    const obolId = BigInt(event!.data).toString();
    setObolId(creatorAccount.id, obolId);
  }, [updateIsFetched]);
  const isLoading = createIsLoading || updateIsLoading;
  return (
    <div className="flex items-center justify-between gap-x-6 bg-indigo-100 px-6 py-2.5 sm:pr-3.5 lg:pl-8">
      <p className="text-sm leading-6">
        Your page {unpublished ? 'is not yet published.' : 'has unpublished changes.'}
      </p>
      {isClient && (
        <Button
          disabled={isDisconnected || isLoading}
          color="indigo"
          onClick={unpublished ? createCreatorAccount : updateCreatorAccount}
        >
          <RocketLaunchIcon />
          Publish{isLoading && 'ing…'}
        </Button>
      )}
    </div>
  );
};

export default UnpublishedBanner;
