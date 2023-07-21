'use client';
import { useIsClient } from 'usehooks-ts';
// import Image from 'next/image';

import { CreatorAccount } from '../../../lib/types';
import { useAccountBalanceOfToken } from '../../lib/hooks';
import LinkButton from './link-button';
import CreatorToolbar from './creator-toolbar';
import UserToolbar from './user-toolbar';
import GuestToolbar from './guest-toolbar';

const Heading = ({
  creatorAccount,
  role,
}: {
  creatorAccount: CreatorAccount;
  role: 'creator' | 'user' | 'guest';
}) => {
  const isClient = useIsClient();
  const balance = useAccountBalanceOfToken(BigInt(creatorAccount.oboleId));
  return (
    <div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-48 w-full object-cover lg:h-64"
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
              <div className="flex items-center">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {creatorAccount.title}
                </h1>
                {isClient && role === 'user' && (
                  <span className="ml-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    {balance} $OBO
                  </span>
                )}
              </div>
              <LinkButton name={creatorAccount.name} />
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {role === 'creator' && <CreatorToolbar />}
              {role === 'user' && <UserToolbar creatorAccount={creatorAccount} />}
              {role === 'guest' && <GuestToolbar name={creatorAccount.name} />}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{creatorAccount.title}</h1>
          <LinkButton name={creatorAccount.name} />
        </div>
      </div>
    </div>
  );
};

export default Heading;
