'use client';
import { usePathname, useRouter } from 'next/navigation';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';

import { Button } from '@/components/button';
import { signInWithEthereum } from '@/app/lib/actions';

const SignButton = ({ nonce }: { nonce: string }) => {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const pathname = usePathname();
  const router = useRouter();
  const onClick = async () => {
    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to Coinnect.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });
    const signature = await signMessageAsync({
      message: siweMessage.prepareMessage(),
    });
    const signUp = pathname !== '/auth/login';
    await signInWithEthereum(siweMessage.toMessage(), signature, signUp);
    if (signUp) {
      router.refresh();
    }
  };
  return (
    <Button color="indigo" onClick={onClick}>
      Sign-in with Ethereum
    </Button>
  );
};

export default SignButton;
