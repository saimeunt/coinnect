'use client';
import { Button } from '@/components/button';
import { ShareIcon } from '@heroicons/react/16/solid';
import useContext from '@/app/ui/lib/context/hook';

const SharePageButton = ({ disabled }: { disabled: boolean }) => {
  const { openSharePageModal } = useContext();
  return (
    <Button disabled={disabled} outline onClick={openSharePageModal}>
      <ShareIcon />
      Share
    </Button>
  );
};

export default SharePageButton;
