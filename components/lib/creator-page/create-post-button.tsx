'use client';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

import useContext from '../context/hook';

const CreatePostButton = () => {
  const { openCreatePostModal } = useContext();
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={openCreatePostModal}
    >
      <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
      <span>Create</span>
    </button>
  );
};

export default CreatePostButton;
