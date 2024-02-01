import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import Heading from '@/app/ui/lib/creator-page/heading';
import Tabs from '@/app/ui/lib/tabs';

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const creatorAccount = await creatorAccountBySlug(slug);
  const title = creatorAccount ? creatorAccount.title : '';
  const description = creatorAccount ? creatorAccount.description : '';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: new URL(`/creators/${slug}`, process.env.NEXT_PUBLIC_BASE_URL).href,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
};

const CreatorsSlugPageLayout = async ({
  params: { slug },
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const creatorAccount = await creatorAccountBySlug(slug);
  if (!creatorAccount) {
    notFound();
  }
  return (
    <>
      <Heading creatorAccount={creatorAccount} role="guest" />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: `/creators/${slug}` },
            // { name: 'Membership', href: '/creator/page/membership' },
            { name: 'About', href: `/creators/${slug}/about` },
          ]}
          centered
        />
      </div>
      {children}
    </>
  );
};

export default CreatorsSlugPageLayout;
