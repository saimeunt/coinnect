'use client';
import { useAccount } from 'wagmi';
import { useIsClient } from 'usehooks-ts';
import { CurrencyDollarIcon } from '@heroicons/react/16/solid';

import useContext from '@/app/ui/lib/context/hook';
import { Button } from '@/components/button';

const DonateButton = () => {
  const isClient = useIsClient();
  const { isDisconnected } = useAccount();
  const { openDonateModal } = useContext();
  return (
    isClient && (
      <Button outline disabled={isDisconnected} onClick={openDonateModal}>
        <CurrencyDollarIcon />
        Make a donation
      </Button>
    )
  );
};

export default DonateButton;
