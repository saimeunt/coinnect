import { currentUser } from '@/app/lib/models/user';
import Header from '@/app/ui/index/header';
import Main from '@/app/ui/index/main';
import Footer from '@/app/ui/index/footer';

const Index = async () => {
  const user = await currentUser();
  return (
    <>
      <Header user={user} />
      <Main />
      <Footer />
    </>
  );
};

export default Index;
