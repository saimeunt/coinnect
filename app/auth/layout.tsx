import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid h-screen place-items-center">{children}</div>
);

export default AuthLayout;
