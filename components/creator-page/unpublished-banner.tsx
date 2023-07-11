import { RocketLaunchIcon } from '@heroicons/react/20/solid';

const UnpublishedBanner = () => {
  return (
    <div className="flex items-center justify-between gap-x-6 bg-indigo-100 px-6 py-2.5 sm:pr-3.5 lg:pl-8">
      <p className="text-sm leading-6">Your page is not yet published.</p>
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <RocketLaunchIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Publish
      </button>
    </div>
  );
};

export default UnpublishedBanner;
