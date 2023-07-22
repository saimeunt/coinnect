import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs';
// import { currentUser } from '../../lib/utils';

import Sidebar from '../../components/lib/sidebar';

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  // const publicMetadata = user.publicMetadata as UserPublicMetadata;
  // const role = publicMetadata.creatorAccount ? 'creator' : 'user';
  return (
    <Sidebar
      navigation={[
        { name: 'My feed', href: '/user', icon: 'NewspaperIcon' },
        { name: 'My memberships', href: '/user/creators', icon: 'IdentificationIcon' },
        { name: 'Discover', href: '/user/discover', icon: 'MagnifyingGlassIcon' },
        // { name: 'Governance', href: '/user/governance', icon: 'EnvelopeOpenIcon' },
        { name: 'Settings', href: '/user/settings', icon: 'CogIcon' },
      ]}
      user={{ fullName: `${user.firstName} ${user.lastName}`, role: 'user' }}
    >
      {children}
    </Sidebar>
  );
};

export default UserLayout;
