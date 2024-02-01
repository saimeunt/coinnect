import { notFound } from 'next/navigation';

import { currentUser } from '@/app/lib/models/user';
import Heading from '@/app/ui/creator-exclusivities/heading';
import ExclusivitiesList from '@/app/ui/creator-exclusivities/exclusivities-list';
import CreateExclusivityDialog from '@/app/ui/creator-exclusivities/create-exclusivity-dialog';
import { exclusivityMintedCount } from '@/app/lib/contracts/coinnect/contract';

const CreatorExclusivities = async () => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    notFound();
  }
  const exclusivityIds = user.creatorAccount.exclusivities.map((exclusivity) => exclusivity.id);
  const mintedCount = await exclusivityMintedCount(exclusivityIds);
  const exclusivities = user.creatorAccount.exclusivities.map((exclusivity, index) => ({
    ...exclusivity,
    minted: mintedCount[index]!,
  }));
  return (
    <div className="m-4">
      <Heading />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <ExclusivitiesList exclusivities={exclusivities} />
        </div>
      </div>
      <CreateExclusivityDialog />
    </div>
  );
};

export default CreatorExclusivities;
