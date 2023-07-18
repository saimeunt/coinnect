// import Image from 'next/image';

import { CreatorAccount } from '../../../lib/types';
import { creatorUrl } from '../../../lib/utils';
import LinkButton from './link-button';
import CreatePostButton from './create-post-button';
import SharePageButton from './share-page-button';
import JoinButton from './join-button';
import SignUpButton from './sign-up-button';

const Heading = ({
  creatorAccount,
  role,
}: {
  creatorAccount: CreatorAccount;
  role: 'creator' | 'user' | 'guest';
}) => {
  const url = creatorUrl(creatorAccount.name);
  return (
    <div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={creatorAccount.bannerUrl}
          alt={creatorAccount.title}
        />
        {/* <Image
          // className="h-32 w-full object-cover lg:h-48"
          src={membership.backgroundImage}
          alt={membership.title}
          fill
        /> */}
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={creatorAccount.avatarUrl}
              alt={creatorAccount.title}
            />
            {/* <Image
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={creatorAccount.avatarUrl}
              alt={creatorAccount.title}
              width={128}
              height={128}
            /> */}
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{creatorAccount.title}</h1>
              <LinkButton host={url.host} href={url.href} pathname={url.pathname} />
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {role === 'creator' && (
                <>
                  <CreatePostButton />
                  <SharePageButton />
                </>
              )}
              {role === 'user' && <JoinButton name={creatorAccount.name} />}
              {role === 'guest' && <SignUpButton name={creatorAccount.name} />}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{creatorAccount.title}</h1>
          <LinkButton host={url.host} href={url.href} pathname={url.pathname} />
        </div>
      </div>
    </div>
  );
};

export default Heading;
