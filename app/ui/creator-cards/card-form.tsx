'use client';
import { useFormState } from 'react-dom';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

import { updateCard } from '@/app/lib/actions';
import { colors } from '@/app/lib/constants';
import { type CardTierName } from '@/app/lib/types';
import SubmitButton from '@/app/ui/lib/submit-button';

const CardForm = ({
  tier,
  logoUrl,
  setLogoUrl,
  color,
  setColor,
}: {
  tier: CardTierName;
  logoUrl: string;
  setLogoUrl: (logoUrl: string) => void;
  color: number;
  setColor: (color: number) => void;
}) => {
  const [, formAction] = useFormState(updateCard.bind(null, tier), {
    message: '',
    errors: {},
  });
  return (
    <form className="mt-4" action={formAction}>
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
              <div className="mt-2 flex items-center gap-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="size-12" src={logoUrl} alt="logo" />
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={(event) => {
                    if (!event.target.files) {
                      return;
                    }
                    const [logo] = event.target.files;
                    if (!logo) {
                      return;
                    }
                    setLogoUrl(URL.createObjectURL(logo));
                  }}
                  hidden
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </label>
              </div>
            </div>
            <div className="sm:col-span-3">
              <RadioGroup value={color} onChange={setColor} name="color">
                <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                  Card color
                </RadioGroup.Label>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {colors.map((color) => (
                    <RadioGroup.Option
                      key={color.id}
                      value={color.id}
                      className={({ active, checked }) =>
                        clsx(
                          `ring-${color.name.toLowerCase()}-500`,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        {color.name}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          `bg-${color.name.toLowerCase()}-500`,
                          'size-8 rounded-full border border-black border-opacity-10',
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
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
        <SubmitButton text="Save" pendingText="Saving…" />
      </div>
    </form>
  );
};

export default CardForm;
