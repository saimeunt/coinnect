import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <div className="flex flex-col items-center text-center">
    <div className="pb-8">
      <Image className="h-32 w-32" src="/icon.svg" alt="Coinnect logo" width={128} height={128} />
      <h1 className="text-3xl">Coinnect</h1>
    </div>
    <SignIn afterSignInUrl="/auth/redirect" />
  </div>
);

export default SignInPage;
