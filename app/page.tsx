import Index from '../components/index';

const title = 'Coinnect';
const description = 'Coinnect - dApp';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://coinnect.vercel.app/',
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
