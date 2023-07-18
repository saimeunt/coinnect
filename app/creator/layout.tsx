import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs';
// import { currentUser } from '../../lib/utils';

import Sidebar from '../../components/lib/sidebar';

const CreatorLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  // const publicMetadata = user.publicMetadata as UserPublicMetadata;
  // const role = publicMetadata.creatorAccount ? 'creator' : 'user';
  return (
    <Sidebar
      navigation={[
        { name: 'Insights', href: '/creator', icon: 'ChartBarIcon' },
        { name: 'My page', href: '/creator/page', icon: 'HomeIcon' },
        { name: 'Cards', href: '/creator/cards', icon: 'IdentificationIcon' },
        { name: 'Exclusivities', href: '/creator/exclusivities', icon: 'GiftIcon' },
        { name: 'Audience', href: '/creator/audience', icon: 'UsersIcon' },
        { name: 'Governance', href: '/creator/governance', icon: 'EnvelopeOpenIcon' },
        { name: 'Payouts', href: '/creator/payouts', icon: 'CurrencyDollarIcon' },
        { name: 'Settings', href: '/creator/settings', icon: 'CogIcon' },
      ]}
      user={{ fullName: `${user.firstName} ${user.lastName}`, role: 'creator' }}
    >
      {children}
    </Sidebar>
  );
};

export default CreatorLayout;
