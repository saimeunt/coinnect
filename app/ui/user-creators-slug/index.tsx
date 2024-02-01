import { notFound } from 'next/navigation';

import { currentAddress } from '@/app/lib/session';
import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';
import { getUserByCreatorAccountId } from '@/app/lib/models/user';
import { membershipCardByOwnerAndCreatorAccountId } from '@/app/lib/contracts/coinnect/contract';
import UserPostsList from '@/app/ui/user-creators-slug/user-posts-list';

const UserCreatorsSlug = async ({ slug }: { slug: string }) => {
  const [address, creatorAccount] = await Promise.all([
    currentAddress(),
    creatorAccountBySlug(slug),
  ]);
  if (!creatorAccount) {
    notFound();
  }
  const [user, membershipCard] = await Promise.all([
    getUserByCreatorAccountId(creatorAccount.id),
    membershipCardByOwnerAndCreatorAccountId(address, creatorAccount.id),
  ]);
  if (!user || !user.userAccount || !user.creatorAccount) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8">
        <UserPostsList
          userAccount={user.userAccount}
          creatorAccount={user.creatorAccount}
          membershipCard={membershipCard}
        />
      </div>
    </div>
  );
};

export default UserCreatorsSlug;
