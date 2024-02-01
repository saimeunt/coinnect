import { notFound } from 'next/navigation';

import { currentUser } from '@/app/lib/models/user';
import Heading from '@/app/ui/creator-exclusivity/heading';
import ExclusivityForm from '@/app/ui/creator-exclusivity/exclusivity-form';

const CreatorExclusivity = async ({ exclusivityId }: { exclusivityId: string }) => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    notFound();
  }
  const exclusivity = user.creatorAccount.exclusivities.find(({ id }) => id === exclusivityId);
  if (!exclusivity) {
    notFound();
  }
  return (
    <div className="m-4">
      <Heading exclusivity={exclusivity} />
      <ExclusivityForm exclusivity={exclusivity} />
    </div>
  );
};

export default CreatorExclusivity;
