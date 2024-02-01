import { /*createClient,*/ http } from 'viem';
import { hardhat, polygonMumbai } from 'viem/chains';
import { createConfig } from 'wagmi';
import { walletConnect, injected /*, coinbaseWallet*/ } from 'wagmi/connectors';
/* import { SiweMessage, generateNonce } from 'siwe';
import { createSIWEConfig } from '@web3modal/siwe';
import { SIWECreateMessageArgs, SIWEVerifyMessageArgs } from '@web3modal/core'; */
import { createWeb3Modal } from '@web3modal/wagmi/react';
// import { getDefaultWallets } from '@rainbow-me/rainbowkit';

// const developmentChains = [hardhat];
// const developmentChains = [polygonMumbai];
// const productionChains = [polygonMumbai];

// export const chains = process.env.NODE_ENV !== 'production' ? developmentChains : productionChains;

/* const { connectors } = getDefaultWallets({
  appName: 'Coinnect',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
}); */

const wagmiConfig = createConfig({
  // chains: [hardhat],
  // client: ({ chain }) =>
  // createClient({ chain, transport: http(/* hardhat.rpcUrls.default.http[0] */) }),
  chains: [hardhat, polygonMumbai],
  transports: {
    [hardhat.id]: http(),
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL),
  },
  connectors: [
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      metadata: {
        name: 'Coinnect',
        description: 'Coinnect - Rewards for your audience.',
        url: process.env.NEXT_PUBLIC_DAPP_URL,
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    /* coinbaseWallet({
        appName: metadata.name,
        appLogoUrl: metadata.icons[0]
      }) */
  ],
});

/* const developmentWagmiConfig = () => {
  return createConfig({
    chains: [hardhat],
    client: ({ chain }) =>
      createClient({ chain, transport: http(hardhat.rpcUrls.default.http[0]) }),
  });
  const { publicClient } = configureChains(productionChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  ]);
  return createConfig({ autoConnect: true, connectors, publicClient });
  const { publicClient } = configureChains(developmentChains, [
    jsonRpcProvider({ rpc: () => ({ http: hardhat.rpcUrls.default.http[0] }) }),
  ]);
  return createConfig({ autoConnect: true, connectors, publicClient });
}; */

/* const productionWagmiConfig = () =>
  createConfig({
    chains: [polygonMumbai],
    client: ({ chain }) =>
      createClient({ chain, transport: http(process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL) }),
  }); */

/* const productionWagmiConfig = () => {
  const { publicClient } = configureChains(productionChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  ]);
  return createConfig({ autoConnect: true, connectors, publicClient });
}; */

/* const wagmiConfig = () =>
  process.env.NODE_ENV !== 'production' ? developmentWagmiConfig() : productionWagmiConfig(); */

/* const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) =>
    new SiweMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement: 'Sign in with Ethereum to Coinnect.',
    }).prepareMessage(),
  getNonce: async () => generateNonce(),
  getSession: async () => {
    console.log('getSession');
    return { address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', chainId: hardhat.id };
    // return null;
    // Fetch currently authenticated user
    const session = await getSession()
    if (!session) {
      throw new Error('Failed to get session!')
    }
    const { address, chainId } = session
    return { address, chainId }
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      console.log('verifyMessage', message, signature);
      return true;
      // Use your SIWE server to verify if the message and the signature are valid
      // Your back-end will tipically rely on SiweMessage(message).validate(signature)
      // const isValid = await validateMessage({ message, signature })
      // return isValid
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      // Sign out by calling the relevant endpoint on your back-end
      // await signOut()
      return true;
    } catch (error) {
      return false;
    }
  },
}); */

createWeb3Modal({
  // siweConfig,
  wagmiConfig,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  // chains: [hardhat],
});

export default wagmiConfig;
