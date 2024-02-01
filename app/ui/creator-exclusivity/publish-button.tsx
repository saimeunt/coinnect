'use client';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useIsClient, useUpdateEffect } from 'usehooks-ts';

import { type Exclusivity } from '@/app/lib/models/exclusivity';
import { useCreateExclusivity } from '@/app/lib/contracts/coinnect/contract';
import { Button } from '@/components/button';
import { setExclusivityTokenId } from '@/app/lib/actions';

const PublishButton = ({ exclusivity }: { exclusivity: Exclusivity }) => {
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  const { hash, createExclusivity } = useCreateExclusivity(exclusivity);
  const { data, isFetched } = useWaitForTransactionReceipt({ hash });
  useUpdateEffect(() => {
    if (!data) {
      return;
    }
    const [event] = data.logs;
    const tokenId = BigInt(event!.data).toString();
    setExclusivityTokenId(exclusivity.id, tokenId);
  }, [isFetched]);
  return (
    isClient && (
      <Button
        color="indigo"
        onClick={createExclusivity}
        disabled={isDisconnected || exclusivity.imageUrl === '' || exclusivity.tokenId !== 0n}
      >
        Publish
      </Button>
    )
  );
};

export default PublishButton;
