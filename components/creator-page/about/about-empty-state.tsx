'use client';
import Image from 'next/image';

import useContext from '../../lib/context/hook';

const AboutEmptyState = () => {
  const { openUpdateDescriptionModal } = useContext();
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex flex-col items-center px-4 py-5 text-center sm:p-6">
        <Image src="/img/about.jpg" alt="About" width={192} height={128} />
        <p className="font-semibold">Introduce yourself</p>
        <p className="text-sm text-gray-600">
          Help people coming to your page get to know you. Share more about who you are, what you
          create and why you&apos;re on Coinnect!
        </p>
        <button
          type="button"
          className="mt-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={openUpdateDescriptionModal}
        >
          Add details
        </button>
      </div>
    </div>
  );
};

export default AboutEmptyState;
