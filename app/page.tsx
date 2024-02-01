import Index from '@/app/ui/index/index';

const title = 'Coinnect';
const description = 'Coinnect - dApp';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_DAPP_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const IndexPage = () => <Index />;

export default IndexPage;
