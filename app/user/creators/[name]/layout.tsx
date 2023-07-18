import { ReactNode } from 'react';

import { getCreatorAccountByName } from '../../../../lib/contracts/accounts/contract';
import Heading from '../../../../components/lib/creator-page/heading';
import Tabs from '../../../../components/lib/tabs';

const UserCreatorsPageLayout = async ({
  params: { name },
  children,
}: {
  params: { name: string };
  children: ReactNode;
}) => {
  const creatorAccount = await getCreatorAccountByName(name);
  return (
    <>
      <Heading creatorAccount={creatorAccount} role="user" />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: `/user/creators/${name}` },
            // { name: 'Membership', href: '/creator/page/membership' },
            { name: 'About', href: `/user/creators/${name}/about` },
          ]}
          centered
        />
      </div>
      {children}
    </>
  );
};

export default UserCreatorsPageLayout;
