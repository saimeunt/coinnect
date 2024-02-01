import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import 'tailwindcss/tailwind.css';
import clsx from 'clsx';
// import '@rainbow-me/rainbowkit/styles.css';

import Providers from '@/app/ui/lib/providers';

const title = 'Coinnect';
const description = 'Welcome to the new creator economy.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={clsx(inter.className, 'h-full')}>
    <body className="h-full overflow-x-hidden bg-slate-50">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export const dynamic = 'force-dynamic';

export default RootLayout;
