import { ReactNode } from 'react';

const CreatorNewLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid h-screen place-items-center">{children}</div>
);

export default CreatorNewLayout;
