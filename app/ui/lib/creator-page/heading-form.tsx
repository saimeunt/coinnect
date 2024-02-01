'use client';
import { useState, useRef } from 'react';
import { useFormState } from 'react-dom';

import Heading from '@/app/ui/lib/creator-page/heading';
import UnsavedBanner from '@/app/ui/lib/creator-page/unsaved-banner';
import { updateBannerAndAvatar } from '@/app/lib/actions';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { useUpdateEffect } from 'usehooks-ts';

const HeadingForm = ({
  unpublished,
  creatorAccount,
}: {
  unpublished: boolean;
  creatorAccount: CreatorAccount;
}) => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const resetForm = () => {
    setBannerUrl('');
    setAvatarUrl('');
    formRef.current?.reset();
  };
  const [state, formAction] = useFormState(updateBannerAndAvatar, { message: '' });
  useUpdateEffect(() => {
    if (state.message === 'Updated banner and avatar.') {
      resetForm();
    }
  }, [state.message]);
  const showUnsavedBanner = bannerUrl !== '' || avatarUrl !== '';
  return (
    <form action={formAction} ref={formRef}>
      {showUnsavedBanner && <UnsavedBanner resetForm={resetForm} />}
      <Heading
        unpublished={unpublished}
        creatorAccount={creatorAccount}
        role="creator"
        bannerUrl={bannerUrl}
        avatarUrl={avatarUrl}
        setBannerUrl={setBannerUrl}
        setAvatarUrl={setAvatarUrl}
      />
    </form>
  );
};

export default HeadingForm;
