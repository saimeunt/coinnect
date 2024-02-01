import Image from 'next/image';
import { MenuButton as HeadlessMenuButton } from '@headlessui/react';
import { useDisconnect } from 'wagmi';

import { type User } from '@/app/lib/models/user';
import { type UserAccount } from '@/app/lib/models/user-account';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSeparator } from '@/components/dropdown';
import { Badge } from '@/components/badge';
import { formatUSDC } from '@/app/lib/utils';
import { signOut } from '@/app/lib/actions';

const ProfileDropdown = ({
  user,
  userAccount,
  creatorAccount,
  userBalance,
  role,
}: {
  user: User;
  userAccount: UserAccount;
  creatorAccount: CreatorAccount | null;
  userBalance: bigint;
  role: 'creator' | 'user';
}) => {
  const { disconnect } = useDisconnect();
  const otherRole = role === 'creator' ? 'user' : 'creator';
  // border border-transparent data-[hover]:bg-indigo-700
  return (
    <Dropdown>
      <HeadlessMenuButton
        className="flex w-full items-center gap-x-4 px-6 py-3 hover:bg-indigo-700"
        aria-label="Profile options"
      >
        <Image
          className="size-10 rounded-lg bg-indigo-700"
          src={`https://effigy.im/a/${user.address}.svg`}
          alt={`${userAccount.username} avatar`}
          width={40}
          height={40}
        />
        <span className="block text-left">
          <span className="block text-sm/5 font-medium text-white">{userAccount.username}</span>
          <span className="block text-xs/5 capitalize text-indigo-200">{role}</span>
        </span>
        <Badge className="ml-auto bg-yellow-50" color="yellow">
          {formatUSDC(userBalance)}
        </Badge>
      </HeadlessMenuButton>
      <DropdownMenu className="z-[100] min-w-[--button-width]">
        <DropdownItem href={`/${role}/profile`}>My profile</DropdownItem>
        {otherRole === 'creator' ? (
          <>
            {creatorAccount ? (
              <DropdownItem href="/creator">Switch to my creator account</DropdownItem>
            ) : (
              <DropdownItem href="/new-creator">Start my own membership</DropdownItem>
            )}
          </>
        ) : (
          <DropdownItem href="user">Switch to my user account</DropdownItem>
        )}
        <DropdownSeparator />
        <DropdownItem
          onClick={async () => {
            disconnect();
            await signOut();
          }}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

/* const ProfileDropdown = ({
  user: { username, address, balance, role },
}: {
  user: { username: string; address: `0x${string}`; balance: bigint; role: string };
}) => {
  const { disconnect } = useDisconnect();
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700">
        <Image
          className="h-10 w-10 rounded-full bg-indigo-700"
          src={`https://effigy.im/a/${address}.svg`}
          alt={`${username} avatar`}
          width={40}
          height={40}
        />
        <div className="flex w-full justify-between">
          <div>
            <span className="sr-only">Your profile</span>
            <span aria-hidden="true">{username}</span>
          </div>
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            {formatUSDC(balance)}
          </span>
        </div>
        // COMMENT1
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{username}</span>
          <div>
            <span className="text-xs capitalize">{role}</span>
            <span className="ml-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {formatCurrency(balance)}
            </span>
          </div>
        </div>
      </Menu.Button>
      // COMMENT2
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-10 w-10 rounded-full bg-indigo-700"
            src={`https://effigy.im/a/${user.address}.svg`}
            alt={`${user.username} avatar`}
            width={40}
            height={40}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-full z-10 mb-2 ml-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={clsx('block cursor-pointer px-4 py-2 text-sm text-gray-700', {
                  'bg-gray-100': active,
                })}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={clsx('block cursor-pointer px-4 py-2 text-sm text-gray-700', {
                  'bg-gray-100': active,
                })}
                onClick={async () => {
                  disconnect();
                  await signOut();
                }}
              >
                Disconnect
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; */

export default ProfileDropdown;
