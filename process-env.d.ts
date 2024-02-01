declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // system
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly VERCEL_ENV: 'development' | 'preview' | 'production';
      readonly VERCEL_URL: string;
      readonly VERCEL_GIT_COMMIT_REF: string;
      // private
      readonly POSTGRES_URL: string;
      readonly ACCOUNT_PRIVATE_KEY: `0x${string}`;
      readonly USER1_ADDRESS: `0x${string}`;
      readonly USER2_ADDRESS: `0x${string}`;
      readonly USER3_ADDRESS: `0x${string}`;
      readonly USER4_ADDRESS: `0x${string}`;
      readonly USER5_ADDRESS: `0x${string}`;
      readonly IRON_SESSION_PASSWORD: string;
      // readonly MAGIC_SECRET_KEY: string;
      // readonly ETHERSCAN_API_KEY: string;
      // readonly CLERK_SECRET_KEY: string;
      // readonly GOOGLE_CLIENT_ID: string;
      // readonly GOOGLE_CLIENT_SECRET: string;
      readonly WEB3_STORAGE_API_KEY: string;
      readonly NFT_STORAGE_API_KEY: string;
      // public
      readonly NEXT_PUBLIC_MOCK: string;
      readonly NEXT_PUBLIC_BASE_URL: string;
      readonly NEXT_PUBLIC_DAPP_URL: string;
      readonly NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY: string;
      // readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      // readonly NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      // readonly NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      readonly NEXT_PUBLIC_ALCHEMY_API_KEY: string;
      readonly NEXT_PUBLIC_ALCHEMY_MUMBAI_URL: string;
      readonly NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS: `0x${string}`;
      readonly NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS: `0x${string}`;
      readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
    }
  }
}

export {};
