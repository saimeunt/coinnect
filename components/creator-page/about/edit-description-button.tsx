'use client';
import { PencilIcon } from '@heroicons/react/20/solid';

import useContext from '../../lib/context/hook';

const EditDescriptionButton = () => {
  const { openUpdateDescriptionModal } = useContext();
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={openUpdateDescriptionModal}
    >
      <PencilIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Edit
    </button>
  );
};

export default EditDescriptionButton;
