import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';
import MembershipCard from '@/app/ui/user-creators/membership-card';

const MembershipCardsList = ({ membershipCards }: { membershipCards: MembershipCardData[] }) => (
  <ul
    role="list"
    className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
  >
    {membershipCards.map((membershipCard) => (
      <MembershipCard key={membershipCard.tokenId.toString()} membershipCard={membershipCard} />
    ))}
  </ul>
);

export default MembershipCardsList;
