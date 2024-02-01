import { type ReactNode } from 'react';

import { currentAddress } from '@/app/lib/session';
import { currentUser } from '@/app/lib/models/user';
import Sidebar from '@/app/ui/lib/sidebar';
import { balanceOf } from '@/app/lib/contracts/stablecoin/contract';
import DisconnectedBanner from '@/app/ui/lib/disconnected-banner';

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const address = await currentAddress();
  const [user, userBalance] = await Promise.all([currentUser(), balanceOf(address)]);
  if (!user || !user.userAccount) {
    return null;
  }
  return (
    <Sidebar
      navigation={[
        { name: 'My feed', href: '/user', icon: 'NewspaperIcon' },
        { name: 'My memberships', href: '/user/creators', icon: 'IdentificationIcon' },
        { name: 'Discover', href: '/user/discover', icon: 'MagnifyingGlassIcon' },
        // { name: 'Governance', href: '/user/governance', icon: 'EnvelopeOpenIcon' },
        { name: 'Settings', href: '/user/settings', icon: 'CogIcon' },
      ]}
      user={user}
      userAccount={user.userAccount}
      creatorAccount={user.creatorAccount}
      userBalance={userBalance}
      role="user"
    >
      <DisconnectedBanner address={address} />
      {children}
    </Sidebar>
  );
};

export default UserLayout;
