'use client';
import useContext from '@/app/ui/lib/context/hook';

import { Button } from '@/components/button';

const Heading = () => {
  const { openCreateExclusivityModal } = useContext();
  return (
    <div className="mb-8 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          My exclusivities
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <Button color="indigo" onClick={openCreateExclusivityModal}>
          New exclusivity
        </Button>
      </div>
    </div>
  );
};

export default Heading;
