import { notFound } from 'next/navigation';

import { getCreatorAccountByName } from '../../../lib/contracts/accounts/contract';
import AboutDescription from '../../lib/creator-page/about-description';

const CreatorsNameAbout = async ({ name }: { name: string }) => {
  const creatorAccount = await getCreatorAccountByName(name);
  if (creatorAccount.name === '\x00') {
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

export default CreatorsNameAbout;
