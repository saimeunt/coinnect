'use client';
import { Fragment, useRef, useTransition } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { useRouter } from 'next/navigation';
import { LinkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import useContext from '../lib/context/hook';
import { createPost } from '../../lib/actions';
import { postTierNames, postTiers } from '../../lib/types';

const CreatePostModal = () => {
  const {
    state: { createPostModalOpen },
    closeCreatePostModal,
  } = useContext();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  return (
    <Transition.Root show={createPostModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeCreatePostModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="my-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create a new post
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">This will create a new video post.</p>
                    </div>
                  </div>
                </div>
                <form
                  id="create-post-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    startTransition(() =>
                      createPost(new FormData(event.target as HTMLFormElement)),
                    );
                    closeCreatePostModal();
                  }}
                >
                  <div>
                    <label
                      htmlFor="video-url"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Video URL
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="video-url"
                        name="video-url"
                        type="url"
                        pattern="^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // placeholder="Type or paste video URL"
                        placeholder="https://www.youtube.com/watch?v="
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Title"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900">Visibility</label>
                    <p className="text-xs text-gray-500">Who can see this post?</p>
                    <fieldset className="mt-4">
                      <legend className="sr-only">Visibility</legend>
                      <div className="space-y-4">
                        {postTierNames.map((tier) => (
                          <div key={tier} className="flex items-center">
                            <input
                              id={tier}
                              name="tier"
                              type="radio"
                              value={tier}
                              defaultChecked={tier === 'standard'}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={tier}
                              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                            >
                              {postTiers[tier]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    form="create-post-form"
                    disabled={isPending}
                    className={clsx(
                      {
                        'bg-indigo-300': isPending,
                        'bg-indigo-600 hover:bg-indigo-500': !isPending,
                      },
                      'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2',
                    )}
                  >
                    Creat{isPending ? 'ing…' : 'e'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={closeCreatePostModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreatePostModal;
