'use client';
import { PencilIcon } from '@heroicons/react/16/solid';

import { Button } from '@/components/button';
import useContext from '@/app/ui/lib/context/hook';

const EditDescriptionButton = () => {
  const { openUpdateDescriptionModal } = useContext();
  return (
    <Button color="indigo" onClick={openUpdateDescriptionModal}>
      <PencilIcon />
      Edit
    </Button>
  );
};

export default EditDescriptionButton;
