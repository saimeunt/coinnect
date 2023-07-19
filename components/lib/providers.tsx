'use client';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { SWRConfig } from 'swr';
import { indigo } from 'tailwindcss/colors';

import wagmiConfig, { chains } from '../../lib/wagmi-config';
import ContextProvider from './context/provider';

const Providers = ({ children }: { children: ReactNode }) => (
  <ContextProvider>
    <WagmiConfig config={wagmiConfig()}>
      <RainbowKitProvider theme={lightTheme({ accentColor: indigo[500] })} chains={chains}>
        <SWRConfig>{children}</SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  </ContextProvider>
);

export default Providers;
