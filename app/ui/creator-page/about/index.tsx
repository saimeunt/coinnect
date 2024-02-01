import { currentUser } from '@/app/lib/models/user';
import About from '@/app/ui/creator-page/about/about';
import UpdateDescriptionDialog from '@/app/ui/creator-page/about/update-description-dialog';

const CreatorPageAbout = async () => {
  const user = await currentUser();
  if (!user || !user.creatorAccount) {
    return null;
  }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <About creatorAccount={user.creatorAccount} />
      </div>
      <UpdateDescriptionDialog description={user.creatorAccount.description} />
    </div>
  );
};

export default CreatorPageAbout;
