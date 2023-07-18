import { ReactNode } from 'react';

const NewCreatorLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid h-screen place-items-center">{children}</div>
);

export default NewCreatorLayout;
