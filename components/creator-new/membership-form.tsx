// 'use client';
// import { useEffect } from 'react';
// import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { createMembership } from '../../lib/actions';
import { interests } from '../../lib/constants';

const MembershipForm = () => {
  /* const { pending } = useFormStatus();
  useEffect(() => {
    console.log(pending);
  }, [pending]); */
  const pending = false;
  return (
    <form className="space-y-6 py-6" action={createMembership}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Page name
        </label>
        <div className="mt-2 flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            {process.env.VERCEL_URL}/
          </span>
          <input
            id="name"
            name="name"
            pattern="^[a-fA-F0-9\-]{31}$"
            required
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
          Page title
        </label>
        <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            id="title"
            name="title"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">Interests</legend>
        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {interests.map((interest) => (
            <div key={interest.id} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm leading-6">
                <label
                  htmlFor={`interest-${interest.id}`}
                  className="select-none font-medium text-gray-900"
                >
                  {interest.name}
                </label>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  id={`interest-${interest.id}`}
                  name={`interest-${interest.id}`}
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
          // disabled={pending}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continu{pending ? 'ing…' : 'e'}
        </button>
      </div>
    </form>
  );
};

export default MembershipForm;
