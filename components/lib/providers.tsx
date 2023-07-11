'use client';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { indigo } from 'tailwindcss/colors';

import wagmiConfig, { chains } from '../../lib/wagmi-config';
// import ContextProvider from './context/provider';

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiConfig config={wagmiConfig()}>
    <RainbowKitProvider theme={lightTheme({ accentColor: indigo[500] })} chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);

export default Providers;
