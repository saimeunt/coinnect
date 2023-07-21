'use client';
import clsx from 'clsx';

import useContext from '../context/hook';
import { CardTierName } from '../../../lib/types';

const SubscribeButton = ({
  disabled,
  tier,
  price,
}: {
  disabled: boolean;
  tier: CardTierName;
  price: number;
}) => {
  const { openSubscribeModal } = useContext();
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        'rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        {
          'bg-indigo-300': disabled,
          'bg-indigo-600 hover:bg-indigo-500': !disabled,
        },
      )}
      onClick={() => openSubscribeModal(tier)}
    >
      Subscribe for ${price} / month
    </button>
  );
};

export default SubscribeButton;
