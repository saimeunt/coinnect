'use client';
import { useEffect, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

import { generateNonce } from '@/app/lib/actions';
import SignButton from '@/app/ui/lib/connect-wallet-wizard/sign-button';

const SignWallet = () => {
  const [nonce, setNonce] = useState('');
  useEffect(() => {
    const performGenerateNonce = async () => {
      const nonce = await generateNonce();
      setNonce(nonce);
    };
    performGenerateNonce();
  }, []);
  return (
    <div className="text-center">
      <PencilSquareIcon className="mx-auto mt-4 size-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        Coinnect needs to connect to your wallet
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Sign this message to prove you own this wallet and proceed.
      </p>
      <div className="mt-6 flex justify-center">
        <SignButton nonce={nonce} />
      </div>
    </div>
  );
};

export default SignWallet;
