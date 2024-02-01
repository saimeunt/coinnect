import { notFound } from 'next/navigation';

import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import AboutDescription from '@/app/ui/lib/creator-page/about-description';

const UserCreatorsSlugAbout = async ({ slug }: { slug: string }) => {
  const creatorAccount = await creatorAccountBySlug(slug);
  if (!creatorAccount) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mt-8">
          <AboutDescription description={creatorAccount.description} />
        </div>
      </div>
    </div>
  );
};

export default UserCreatorsSlugAbout;
