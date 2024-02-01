import { currentAddress } from '@/app/lib/session';
import { membershipCardsByOwner } from '@/app/lib/contracts/coinnect/contract';
import MembershipCardsList from '@/app/ui/user-creators/membership-cards-list';

const UserCreators = async () => {
  const address = await currentAddress();
  const membershipCards = await membershipCardsByOwner(address);
  return (
    <div className="m-4">
      <h2 className="mb-4 text-xl font-bold leading-7">My membership cards</h2>
      <MembershipCardsList membershipCards={membershipCards} />
    </div>
  );
};

export default UserCreators;
