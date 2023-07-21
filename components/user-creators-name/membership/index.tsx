import { notFound } from 'next/navigation';

import { getCreatorAccountByName } from '../../../lib/contracts/accounts/contract';
import TiersList from '../../lib/creator-page/tiers-list';
import SubcribeModal from './subscribe-modal';

const UserCreatorsNameMembership = async ({ name }: { name: string }) => {
  const creatorAccount = await getCreatorAccountByName(name);
  if (creatorAccount.name === '\x00') {
    notFound();
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <TiersList role="user" name={creatorAccount.name} />
      </div>
      <SubcribeModal name={creatorAccount.name} />
    </div>
  );
};

export default UserCreatorsNameMembership;
