'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchSection = () => (
  <div className="flex flex-col items-center py-12 text-center">
    <h2 className="pb-8 text-4xl font-semibold">Search over 10,000 creators on Coinnect</h2>
    <form
      className="w-full max-w-md lg:col-span-5 lg:pt-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex gap-x-4">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative min-w-0 flex-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="size-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            required
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Find a creator"
          />
        </div>
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Search
        </button>
      </div>
    </form>
  </div>
);

export default SearchSection;
