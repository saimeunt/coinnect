import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs';

import SidebarLayout from './sidebar-layout';

const CreatorLayout = async ({ children }: { children: ReactNode }) => {
  /* const user = await currentUser();
  if (!user) {
    return null;
  } */
  return (
    <SidebarLayout user={{ fullName: /*`${user.firstName} ${user.lastName}`*/ '' }}>
      {children}
    </SidebarLayout>
  );
};

export default CreatorLayout;
