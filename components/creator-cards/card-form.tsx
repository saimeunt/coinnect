'use client';
import { useTransition } from 'react';
// import { EyeIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { updateCard } from '../../lib/actions';
import { colors } from '../../lib/constants';
import { CardTierName } from '../../lib/types';

const CardForm = ({
  tier,
  // logoUrl,
  setLogoUrl,
  // setDataUrl,
  color,
  setColor,
}: // previewLink,
{
  tier: CardTierName;
  logoUrl: string;
  setLogoUrl: (logoUrl: string) => void;
  // setDataUrl: (dataUrl: string) => void;
  color: number;
  setColor: (color: number) => void;
  // previewLink: string;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      className="mt-4"
      // action={updateCard}
      onSubmit={async (event) => {
        event.preventDefault();
        startTransition(() => updateCard(new FormData(event.target as HTMLFormElement), tier));
      }}
    >
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Card customization</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You can customize the look and feel of your membership cards.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">
                Card logo
              </label>
              {/*<div className="mt-2 flex items-center gap-x-3">
                <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div> */}
              <div className="mt-2">
                <input
                  id="logo"
                  className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 file:hidden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="logo"
                  type="file"
                  onChange={(event) => {
                    if (!event.target.files) {
                      return;
                    }
                    const [logo] = event.target.files;
                    if (!logo) {
                      return;
                    }
                    setLogoUrl(URL.createObjectURL(logo));
                    /* const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.addEventListener(
                      'load',
                      () => setDataUrl(fileReader.result as string),
                      false,
                    ); */
                  }}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
                Card color
              </label>
              <div className="mt-2">
                <select
                  id="color"
                  name="color"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={color}
                  onChange={(event) => setColor(Number(event.target.value))}
                >
                  {colors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        {/* <a
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <EyeIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Preview
        </a> */}
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            'rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            { 'bg-indigo-300': isPending, 'bg-indigo-600 hover:bg-indigo-500': !isPending },
          )}
        >
          Sav{isPending ? 'ing…' : 'e'}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
