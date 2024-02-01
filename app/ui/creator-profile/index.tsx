import { currentUser } from '@/app/lib/models/user';
import UserAccountForm from '@/app/ui/lib/user-account-form';

const CreatorProfile = async () => {
  const user = await currentUser();
  if (!user || !user.userAccount) {
    return null;
  }
  return (
    <div className="m-4">
      <h2 className="mb-8 text-xl font-bold leading-7">Profile</h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <UserAccountForm userAccount={user.userAccount} />
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
