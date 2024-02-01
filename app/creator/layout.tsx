import { type ReactNode } from 'react';

import { currentAddress } from '@/app/lib/session';
import { currentUser } from '@/app/lib/models/user';
import Sidebar from '@/app/ui/lib/sidebar';
import { balanceOf } from '@/app/lib/contracts/stablecoin/contract';

const CreatorLayout = async ({ children }: { children: ReactNode }) => {
  const address = await currentAddress();
  const [user, userBalance] = await Promise.all([currentUser(), balanceOf(address)]);
  if (!user || !user.userAccount || !user.creatorAccount) {
    return null;
  }
  return (
    <Sidebar
      navigation={[
        { name: 'My page', href: '/creator', icon: 'HomeIcon' },
        { name: 'Insights', href: '/creator/insights', icon: 'ChartBarIcon' },
        { name: 'Cards', href: '/creator/cards', icon: 'IdentificationIcon' },
        { name: 'Exclusivities', href: '/creator/exclusivities', icon: 'GiftIcon' },
        { name: 'Audience', href: '/creator/audience', icon: 'UsersIcon' },
        { name: 'Governance', href: '/creator/governance', icon: 'EnvelopeOpenIcon' },
        { name: 'Payouts', href: '/creator/payouts', icon: 'CurrencyDollarIcon' },
        { name: 'Settings', href: '/creator/settings', icon: 'CogIcon' },
      ]}
      user={user}
      userAccount={user.userAccount}
      creatorAccount={user.creatorAccount}
      userBalance={userBalance}
      role="creator"
    >
      {children}
    </Sidebar>
  );
};

export default CreatorLayout;
