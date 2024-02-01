import { notFound } from 'next/navigation';

import { currentUser } from '@/app/lib/models/user';
import {
  creatorAccountBySlug,
  membershipCardByOwnerAndCreatorAccountId,
} from '@/app/lib/contracts/coinnect/contract';
import TiersList from '@/app/ui/lib/creator-page/tiers-list';
import SubcribeDialog from '@/app/ui/user-creators-slug/membership/subscribe-dialog';

const UserCreatorsSlugMembership = async ({ slug }: { slug: string }) => {
  const [user, creatorAccount] = await Promise.all([currentUser(), creatorAccountBySlug(slug)]);
  if (!user || !creatorAccount) {
    notFound();
  }
  const membershipCard = await membershipCardByOwnerAndCreatorAccountId(
    user.address,
    creatorAccount.id,
  );
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <TiersList
          role="user"
          creatorAccountId={creatorAccount.id}
          userAccount={user.userAccount}
          membershipCard={membershipCard}
        />
      </div>
      <SubcribeDialog creatorAccountId={creatorAccount.id} />
    </div>
  );
};

export default UserCreatorsSlugMembership;
