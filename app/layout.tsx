import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import 'tailwindcss/tailwind.css';
import '@rainbow-me/rainbowkit/styles.css';

import Providers from '../components/lib/providers';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className="h-full">
    <body className="h-full overflow-x-hidden bg-slate-50">
      <ClerkProvider>
        <Providers>{children}</Providers>
      </ClerkProvider>
    </body>
  </html>
);

export const dynamic = 'force-dynamic';

export default RootLayout;
