import { createPublicClient, http } from 'viem';
import { hardhat, polygonMumbai } from 'viem/chains';

const developmentPublicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

const productionPublicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL),
});

const publicClient =
  process.env.NODE_ENV !== 'production' ? developmentPublicClient : productionPublicClient;

export default publicClient;
