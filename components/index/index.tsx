import { currentUser } from '@clerk/nextjs';

import Header from './header';
import Main from './main';
import Footer from './footer';

const Index = async () => {
  const user = await currentUser();
  return (
    <>
      <Header user={user ? { publicMetadata: user.publicMetadata } : null} />
      <Main />
      <Footer />
    </>
  );
};

export default Index;
