'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';

import { baseUrl } from '../../../../lib/utils';

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const afterSignUpUrl = new URL('/auth/redirect', baseUrl());
  afterSignUpUrl.searchParams.append('sign-up', 'true');
  const role = searchParams.get('role');
  afterSignUpUrl.searchParams.append('role', role === 'creator' ? 'creator' : 'user');
  const creator = searchParams.get('creator');
  if (creator) {
    afterSignUpUrl.searchParams.append('creator', creator);
  }
  return (
    <div className="flex flex-col items-center text-center">
      <div className="pb-8">
        <Image className="h-32 w-32" src="/icon.svg" alt="Coinnect logo" width={128} height={128} />
        <h1 className="text-3xl">Coinnect</h1>
      </div>
      <SignUp afterSignUpUrl={afterSignUpUrl.href} />
    </div>
  );
};

export default SignUpPage;
