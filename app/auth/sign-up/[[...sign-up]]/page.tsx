'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-center text-center">
      <div className="pb-8">
        <Image className="h-32 w-32" src="/icon.svg" alt="Coinnect logo" width={128} height={128} />
        <h1 className="text-3xl">Coinnect</h1>
      </div>
      <SignUp
        afterSignUpUrl={`/auth/redirect?signUp=true&role=${
          searchParams.get('role') === 'creator' ? 'creator' : 'user'
        }`}
      />
    </div>
  );
};

export default SignUpPage;
