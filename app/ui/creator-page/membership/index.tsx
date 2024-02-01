import { currentUser } from '@/app/lib/models/user';
import TiersList from '@/app/ui/lib/creator-page/tiers-list';

const CreatorPageMembership = async () => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return null;
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <TiersList role="creator" creatorAccountId={user.creatorAccount.id} />
      </div>
    </div>
  );
};

export default CreatorPageMembership;
