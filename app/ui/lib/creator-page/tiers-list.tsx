import { capitalize } from 'lodash';

import { type CardTierName } from '@/app/lib/types';
import JoinButton from '@/app/ui/lib/creator-page/heading/user-toolbar/join-button';
import SubscribeButton from '@/app/ui/lib/creator-page/subscribe-button';
import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';
import { type UserAccount } from '@/app/lib/models/user-account';

const Tier = ({
  role,
  creatorAccountId,
  userAccount,
  tier,
  price,
  // membersCount,
  description,
  membershipCard,
}: {
  role: 'creator' | 'user';
  creatorAccountId: string;
  userAccount?: UserAccount | null;
  tier: CardTierName;
  price: number;
  // membersCount: number;
  description: string;
  membershipCard?: MembershipCardData | null;
}) => (
  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div className="flex items-center justify-between px-4 py-5 sm:px-6">
      <p>{capitalize(tier)} membership</p>
      <div>
        {role === 'creator' ? (
          <p className="text-sm">{price === 0 ? 'Free' : `$${price} / month`}</p>
        ) : (
          <>
            {tier === 'free' && userAccount ? (
              <JoinButton
                creatorAccountId={creatorAccountId}
                userAccount={userAccount}
                disabled={!!membershipCard}
              />
            ) : (
              <SubscribeButton
                disabled={
                  !membershipCard ||
                  membershipCard.tier === tier ||
                  (membershipCard.tier === 'premium' && tier === 'standard')
                }
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

const TiersList = ({
  role,
  creatorAccountId,
  userAccount,
  membershipCard,
}: {
  role: 'creator' | 'user';
  creatorAccountId: string;
  userAccount?: UserAccount | null;
  membershipCard?: MembershipCardData | null;
}) => (
  <div className="space-y-8 py-8">
    <Tier
      role={role}
      creatorAccountId={creatorAccountId}
      userAccount={userAccount}
      tier="free"
      price={0}
      // membersCount={0}
      description="Access to free content."
      membershipCard={membershipCard}
    />
    <Tier
      role={role}
      creatorAccountId={creatorAccountId}
      userAccount={userAccount}
      tier="standard"
      price={15}
      // membersCount={0}
      description="Access to exclusive content and more."
      membershipCard={membershipCard}
    />
    <Tier
      role={role}
      creatorAccountId={creatorAccountId}
      userAccount={userAccount}
      tier="premium"
      price={30}
      // membersCount={0}
      description="Access to premium content and exclusivities."
      membershipCard={membershipCard}
    />
  </div>
);

export default TiersList;
