'use client';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

import useContext from '../context/hook';

const DonateButton = () => {
  const { openDonateModal } = useContext();
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={openDonateModal}
    >
      <CurrencyDollarIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      <span>Make a donation</span>
    </button>
  );
};

export default DonateButton;
