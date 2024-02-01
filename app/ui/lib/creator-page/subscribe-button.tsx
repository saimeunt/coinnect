'use client';
// import { useAccount } from 'wagmi';
// import { useIsClient } from 'usehooks-ts';

import useContext from '@/app/ui/lib/context/hook';
import { type CardTierName } from '@/app/lib/types';
import { Button } from '@/components/button';

const SubscribeButton = ({
  disabled,
  tier,
  price,
}: {
  disabled: boolean;
  tier: CardTierName;
  price: number;
}) => {
  // const isClient = useIsClient();
  const { openSubscribeModal } = useContext();
  // const { isDisconnected } = useAccount();
  return (
    /*isClient &&*/ <Button
      color="indigo"
      disabled={disabled /* || isDisconnected*/}
      onClick={() => openSubscribeModal(tier)}
    >
      Subscribe for ${price} / month
    </Button>
  );
};

export default SubscribeButton;
