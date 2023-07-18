import { ReactNode } from 'react';

import Tabs from '../../../components/lib/tabs';

const CardsLayout = ({ children }: { children: ReactNode }) => (
  <div className="m-4">
    <h2 className="text-xl font-bold leading-7">Cards</h2>
    <Tabs
      tabs={[
        { name: 'Free membership', href: '/creator/cards' },
        { name: 'Standard membership', href: '/creator/cards/standard' },
        { name: 'Premium membership', href: '/creator/cards/premium' },
      ]}
    />
    {children}
  </div>
);

export default CardsLayout;
