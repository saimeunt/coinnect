// import { UserPublicMetadata as ClerkUserPublicMetadata } from '@clerk/nextjs';

declare namespace NodeJS {
  interface ProcessEnv {
    // system
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly VERCEL_ENV: 'development' | 'preview' | 'production';
    readonly VERCEL_URL: string;
    readonly VERCEL_GIT_COMMIT_REF: string;
    // private
    readonly ACCOUNT_PRIVATE_KEY: string;
    readonly USER1_ADDRESS: string;
    readonly USER2_ADDRESS: string;
    readonly USER3_ADDRESS: string;
    // readonly ETHERSCAN_API_KEY: string;
    readonly CLERK_SECRET_KEY: string;
    // readonly GOOGLE_CLIENT_ID: string;
    // readonly GOOGLE_CLIENT_SECRET: string;
    readonly WEB3_STORAGE_API_KEY: string;
    // public
    readonly NEXT_PUBLIC_DAPP_URL: string;
    readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    readonly NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    readonly NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    readonly NEXT_PUBLIC_ALCHEMY_API_KEY: string;
    readonly NEXT_PUBLIC_ALCHEMY_MUMBAI_URL: string;
    readonly NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS: `0x${string}`;
    readonly NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS: `0x${string}`;
    readonly NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS: `0x${string}`;
    readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
  }
}

/* type CardTier = { logoUrl: string; color: string };

declare global {
  export interface UserPublicMetadata extends ClerkUserPublicMetadata {
    cards: { free: CardTier; standard: CardTier; premium: CardTier };
  }
} */
