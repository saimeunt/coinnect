'use client';
import { Button } from '@/components/button';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import useContext from '@/app/ui/lib/context/hook';

const CreatePostButton = () => {
  const { openCreatePostModal } = useContext();
  return (
    <Button outline onClick={openCreatePostModal}>
      <PencilSquareIcon />
      Create
    </Button>
  );
};

export default CreatePostButton;
