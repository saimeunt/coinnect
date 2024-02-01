'use client';
import { Fragment, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
  HomeIcon,
  IdentificationIcon,
  GiftIcon,
  UsersIcon,
  EnvelopeOpenIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CogIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import ProfileDropdown from '@/app/ui/lib/profile-dropdown';
import { type User } from '@/app/lib/models/user';
import { type UserAccount } from '@/app/lib/models/user-account';
import { type CreatorAccount } from '@/app/lib/models/creator-account';

const icons = {
  ChartBarIcon,
  HomeIcon,
  IdentificationIcon,
  GiftIcon,
  UsersIcon,
  EnvelopeOpenIcon,
  CurrencyDollarIcon,
  CogIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
} as const;

type Icon = keyof typeof icons;

const Sidebar = ({
  navigation,
  user,
  userAccount,
  creatorAccount,
  userBalance,
  role,
  children,
}: {
  navigation: { name: string; href: string; icon: Icon }[];
  user: User;
  userAccount: UserAccount;
  creatorAccount: CreatorAccount | null;
  userBalance: bigint;
  role: 'creator' | 'user';
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const currentNav = navigation.find(({ href }) => href === pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (href: string) =>
    href === `/${role}` ? pathname === href : pathname.startsWith(href);
  const navigationWithIcon = navigation.map((nav) => ({ ...nav, icon: icons[nav.icon] }));
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="size-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    {/* <Image
                        className="h-8 w-auto"
                        src="/icon.svg"
                        alt="Coinnect logo"
                        width={128}
                        height={128}
                      /> */}
                    <BuildingLibraryIcon className="h-8 w-auto text-white" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigationWithIcon.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={clsx(
                                  isActive(item.href)
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    isActive(item.href)
                                      ? 'text-white'
                                      : 'text-indigo-200 group-hover:text-white',
                                    'size-6 shrink-0',
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="-mx-6">
                        <ProfileDropdown
                          user={user}
                          userAccount={userAccount}
                          creatorAccount={creatorAccount}
                          userBalance={userBalance}
                          role={role}
                        />
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
          <div className="flex h-16 shrink-0 items-center">
            {/* <Image
                className="h-8 w-auto"
                src="/icon.svg"
                alt="Coinnect logo"
                width={128}
                height={128}
              /> */}
            <BuildingLibraryIcon className="h-8 w-auto text-white" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationWithIcon.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={clsx(
                          isActive(item.href)
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                      >
                        <item.icon
                          className={clsx(
                            isActive(item.href)
                              ? 'text-white'
                              : 'text-indigo-200 group-hover:text-white',
                            'size-6 shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                {/* <div className="px-6 py-3">
                    <ConnectButton />
                  </div> */}
                <ProfileDropdown
                  user={user}
                  userAccount={userAccount}
                  creatorAccount={creatorAccount}
                  userBalance={userBalance}
                  role={role}
                />
                {/* <div className="flex items-center gap-x-4 px-6 py-3 text-white">
                    <Image
                      className="h-10 w-10 rounded-full bg-indigo-700"
                      src={`https://effigy.im/a/${user.address}.svg`}
                      alt={`${user.username} avatar`}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{user.username}</span>
                      <div>
                        <span className="text-xs capitalize">{user.role}</span>
                        <span className="ml-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          {formatCurrency(balance)}
                        </span>
                      </div>
                    </div>
                </div> */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="size-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          {currentNav && currentNav.name}
        </div>
        <>
          {/* <ConnectButton /> */}
          {/* <UserButton /> */}
        </>
      </div>
      <main className="lg:pl-72">{children}</main>
    </div>
  );
};

export default Sidebar;
