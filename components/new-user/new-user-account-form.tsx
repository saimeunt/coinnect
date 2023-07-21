'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { createUserAccount } from '../../lib/actions';
import { interests } from '../../lib/constants';

const avatars = [
  { id: '/img/users/avatar1.jpg', name: 'Avatar 1' },
  { id: '/img/users/avatar2.jpg', name: 'Avatar 2' },
  { id: '/img/users/avatar3.jpg', name: 'Avatar 3' },
  { id: '/img/users/avatar4.jpg', name: 'Avatar 4' },
  { id: '/img/users/avatar5.jpg', name: 'Avatar 5' },
  { id: '/img/users/avatar6.jpg', name: 'Avatar 6' },
  { id: '/img/users/avatar7.jpg', name: 'Avatar 7' },
  { id: '/img/users/avatar8.jpg', name: 'Avatar 8' },
  { id: '/img/users/avatar9.jpg', name: 'Avatar 9' },
  { id: '/img/users/avatar10.jpg', name: 'Avatar 10' },
] as const;

const NewUserAccountForm = () => {
  const [avatarUrl, setAvatarUrl] = useState('/img/creator1.jpg');
  const [isPending, startTransition] = useTransition();
  return (
    <form
      className="space-y-6 py-6"
      onSubmit={async (event) => {
        event.preventDefault();
        startTransition(() => createUserAccount(new FormData(event.target as HTMLFormElement)));
      }}
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            id="username"
            name="username"
            pattern="^[\w\-]{4,31}$"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="col-span-full">
        <label htmlFor="avatar-url" className="block text-sm font-medium leading-6 text-gray-900">
          Avatar
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          {/* <UserCircleIcon className="h-16 w-16 text-gray-300" aria-hidden="true" /> */}
          <Image className="h-16 w-16" src={avatarUrl} alt="Avatar" width={64} height={64} />
          <select
            id="avatar-url"
            name="avatar-url"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
          >
            {avatars.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {/* <button
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Change
          </button> */}
        </div>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">Interests</legend>
        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {interests.map((interest) => (
            <div key={interest.id} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm leading-6">
                <label
                  htmlFor={`interests-${interest.id}`}
                  className="select-none font-medium text-gray-900"
                >
                  {interest.name}
                </label>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  id={`interests-${interest.id}`}
                  name={`interests-${interest.id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            {
              'bg-indigo-300': isPending,
              'bg-indigo-600 hover:bg-indigo-500': !isPending,
            },
          )}
        >
          Continu{isPending ? 'ing…' : 'e'}
        </button>
      </div>
    </form>
  );
};

export default NewUserAccountForm;
