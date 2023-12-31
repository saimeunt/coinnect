import { createConfig, configureChains } from 'wagmi';
import { hardhat, polygonMumbai } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const developmentChains = [hardhat];
const productionChains = [polygonMumbai];

export const chains = process.env.NODE_ENV !== 'production' ? developmentChains : productionChains;

const { connectors } = getDefaultWallets({
  appName: 'Coinnect',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains,
});

const developmentWagmiConfig = () => {
  const { publicClient } = configureChains(developmentChains, [
    jsonRpcProvider({ rpc: () => ({ http: hardhat.rpcUrls.default.http[0] }) }),
  ]);
  return createConfig({ autoConnect: true, connectors, publicClient });
};

const productionWagmiConfig = () => {
  const { publicClient } = configureChains(productionChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  ]);
  return createConfig({ autoConnect: true, connectors, publicClient });
};

const wagmiConfig = () =>
  process.env.NODE_ENV !== 'production' ? developmentWagmiConfig() : productionWagmiConfig();

export default wagmiConfig;
