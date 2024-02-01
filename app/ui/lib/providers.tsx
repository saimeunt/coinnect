'use client';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
// import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
// import { SWRConfig } from 'swr';
// import { indigo } from 'tailwindcss/colors';

import wagmiConfig /*, { chains }*/ from '@/app/lib/wagmi-config';
import ContextProvider from '@/app/ui/lib/context/provider';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => (
  <ContextProvider>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider theme={lightTheme({ accentColor: indigo[500] })} chains={chains}> */}
        {children}
        {/* </RainbowKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  </ContextProvider>
);

export default Providers;
