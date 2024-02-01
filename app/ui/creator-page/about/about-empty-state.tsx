'use client';
// import Image from 'next/image';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/button';
import useContext from '@/app/ui/lib/context/hook';

const AboutEmptyState = () => {
  const { openUpdateDescriptionModal } = useContext();
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex flex-col items-center gap-y-2 px-4 py-5 text-center sm:p-6">
        <QuestionMarkCircleIcon className="size-12 text-gray-400" />
        {/* <Image src="/img/about.jpg" alt="About" width={192} height={128} /> */}
        <p className="font-semibold">Introduce yourself</p>
        <p className="text-sm text-gray-600">
          Help people coming to your page get to know you. Share more about who you are, what you
          create and why you&apos;re on Coinnect!
        </p>
        <Button className="mt-4" outline onClick={openUpdateDescriptionModal}>
          Add details
        </Button>
      </div>
    </div>
  );
};

export default AboutEmptyState;
