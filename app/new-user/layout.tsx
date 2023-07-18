import { ReactNode } from 'react';

const NewUserLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid h-screen place-items-center">{children}</div>
);

export default NewUserLayout;
