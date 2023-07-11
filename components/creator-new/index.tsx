// 'use client';
// import { useIsClient } from 'usehooks-ts';
// import { useAccount } from 'wagmi';

// import ConnectWallet from './connect-wallet';
import CreateMembership from './create-membership';

const CreatorNew = () => {
  // const isClient = useIsClient();
  // const { isConnected } = useAccount();
  // return isClient && isConnected ? <CreateMembership /> : <ConnectWallet />;
  return <CreateMembership />;
};

export default CreatorNew;
