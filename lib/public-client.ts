import { createPublicClient, http } from 'viem';

const hardhat = {
  id: 31337,
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
};

const polygonMumbai = {
  id: 80001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-mumbai.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-mumbai.infura.io/v3'],
      webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
    },
    default: {
      http: ['https://matic-mumbai.chainstacklabs.com'],
    },
    public: {
      http: ['https://matic-mumbai.chainstacklabs.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11' as `0x${string}`,
      blockCreated: 25770160,
    },
  },
  testnet: true,
};

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
