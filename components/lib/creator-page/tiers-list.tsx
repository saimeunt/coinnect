'use client';
import { capitalize } from 'lodash';

import { CardTierName, MembershipCardNft } from '../../../lib/types';
import { useMembershipCard } from '../hooks';
import JoinButton from './join-button';
import SubscribeButton from './subscribe-button';

const Tier = ({
  role,
  name,
  membershipCard,
  tier,
  price,
  // membersCount,
  description,
}: {
  role: 'creator' | 'user';
  name: string;
  membershipCard?: MembershipCardNft;
  tier: CardTierName;
  price: number;
  // membersCount: number;
  description: string;
}) => (
  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div className="flex items-center justify-between px-4 py-5 sm:px-6">
      <p>{capitalize(tier)} membership</p>
      <div>
        {role === 'creator' ? (
          <p className="text-sm">{price === 0 ? 'Free' : `$${price} / month`}</p>
        ) : (
          <>
            {tier === 'free' && !membershipCard && <JoinButton name={name} />}
            {tier !== 'free' && (
              <SubscribeButton
                disabled={!membershipCard || membershipCard.tier === tier}
                tier={tier}
                price={price}
              />
            )}
          </>
        )}
        {/* <p className="text-xs">
          {membersCount} member{membersCount === 1 ? '' : 's'}
        </p> */}
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const TiersList = ({ role, name }: { role: 'creator' | 'user'; name: string }) => {
  const { membershipCard } = useMembershipCard(name);
  return (
    <div className="space-y-8 py-8">
      <Tier
        role={role}
        name={name}
        membershipCard={membershipCard}
        tier="free"
        price={0}
        // membersCount={0}
        description="Access to free content."
      />
      <Tier
        role={role}
        name={name}
        membershipCard={membershipCard}
        tier="standard"
        price={15}
        // membersCount={0}
        description="Access to exclusive content and more."
      />
      <Tier
        role={role}
        name={name}
        membershipCard={membershipCard}
        tier="premium"
        price={30}
        // membersCount={0}
        description="Access to premium content and exclusivities."
      />
    </div>
  );
};

export default TiersList;
