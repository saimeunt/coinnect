import { PhotoIcon } from '@heroicons/react/20/solid';

import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { Avatar } from '@/components/avatar';

const AvatarField = ({
  creatorAccount,
  avatarUrl,
  setAvatarUrl,
  role,
}: {
  creatorAccount: CreatorAccount;
  avatarUrl: string;
  setAvatarUrl: (avatarUrl: string) => void;
  role: 'creator' | 'user' | 'guest';
}) => (
  <div className="group relative flex">
    <Avatar
      className="size-24 ring-4 ring-white sm:size-32"
      src={avatarUrl === '' ? creatorAccount.avatarUrl : avatarUrl}
    />
    {role === 'creator' && (
      <>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={(event) => {
            if (!event.target.files) {
              return;
            }
            const [avatar] = event.target.files;
            if (!avatar) {
              return;
            }
            setAvatarUrl(URL.createObjectURL(avatar));
          }}
          hidden
        />
        <label
          htmlFor="avatar"
          className="invisible absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-hover:visible"
        >
          <PhotoIcon className="size-5" aria-hidden="true" />
        </label>
      </>
    )}
  </div>
);

export default AvatarField;
