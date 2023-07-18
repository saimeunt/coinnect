import { ReactNode } from 'react';

import { getCreatorAccountByName } from '../../../lib/contracts/accounts/contract';
import Heading from '../../../components/lib/creator-page/heading';
import Tabs from '../../../components/lib/tabs';

const CreatorsPageLayout = async ({
  params: { name },
  children,
}: {
  params: { name: string };
  children: ReactNode;
}) => {
  const creatorAccount = await getCreatorAccountByName(name);
  return (
    <>
      <Heading creatorAccount={creatorAccount} role="guest" />
      <div className="mt-4 px-4">
        <Tabs
          tabs={[
            { name: 'Home', href: `/creators/${name}` },
            // { name: 'Membership', href: '/creator/page/membership' },
            { name: 'About', href: `/creators/${name}/about` },
          ]}
          centered
        />
      </div>
      {children}
    </>
  );
};

export default CreatorsPageLayout;
