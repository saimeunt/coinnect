'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { formatUnits } from 'viem';

import { type Exclusivity } from '@/app/lib/models/exclusivity';
import { updateExclusivity } from '@/app/lib/actions';
import SubmitButton from '@/app/ui/lib/submit-button';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import ImageField from '@/app/ui/lib/image-field';

const ExclusivityForm = ({ exclusivity }: { exclusivity: Exclusivity }) => {
  const [imageUrl, setImageUrl] = useState(exclusivity.imageUrl);
  const [, formAction] = useFormState(updateExclusivity.bind(null, exclusivity.id), {
    message: '',
    errors: {},
  });
  const disabled = exclusivity.tokenId !== 0n;
  return (
    <form className="mt-4" action={formAction}>
      <div className="space-y-4">
        <Fieldset className="border-b border-gray-900/10 pb-4" disabled={disabled}>
          {!disabled && (
            <>
              <Legend>Edit your exclusivity</Legend>
              <Text>You can modify your exclusivity until you publish it on-chain.</Text>
            </>
          )}
          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input name="title" defaultValue={exclusivity.title} required />
            </Field>
            <Field>
              <Label>Description</Label>
              <Textarea name="description" defaultValue={exclusivity.description} required />
              {!disabled && (
                <Description>Describe your exclusivity in a few sentences.</Description>
              )}
            </Field>
            <ImageField
              label="Image"
              name="image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              disabled={disabled}
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
              <Field>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  min={1}
                  defaultValue={formatUnits(BigInt(exclusivity.price), 9)}
                  placeholder="1"
                  required
                />
              </Field>
              <Field>
                <Label>Total supply</Label>
                <Input
                  type="number"
                  name="total-supply"
                  defaultValue={exclusivity.totalSupply}
                  placeholder="Leave empty for unlimited supply"
                />
              </Field>
            </div>
          </FieldGroup>
        </Fieldset>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <SubmitButton text="Save" pendingText="Saving…" disabled={disabled} />
      </div>
    </form>
  );
};

/* const ExclusivityForm = ({ exclusivity }: { exclusivity: Exclusivity }) => {
  const [imageUrl, setImageUrl] = useState(exclusivity.imageUrl);
  const [, formAction] = useFormState(updateExclusivity.bind(null, exclusivity.id), {
    message: '',
    errors: {},
  });
  return (
    <form className="mt-4" action={formAction}>
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit your exclusivity</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You can modify your exclusivity until you publish it on-chain.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={exclusivity.title}
                  required
                />
              </div>
            </div>
            <div className="col-span-full">
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
                  defaultValue={exclusivity.description}
                  required
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Describe your exclusivity in a few sentences.
              </p>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {imageUrl ? (
                  <>
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="h-12 w-12" src={imageUrl} alt="image" />
                  </>
                ) : (
                  <PhotoIcon className="h-12 w-12 text-indigo-300" />
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    if (!event.target.files) {
                      return;
                    }
                    const [image] = event.target.files;
                    if (!image) {
                      return;
                    }
                    setImageUrl(URL.createObjectURL(image));
                  }}
                  hidden
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={formatUnits(BigInt(exclusivity.price), 9)}
                  placeholder="0"
                  aria-describedby="price-currency"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                    OBO
                  </span>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="total-supply"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Total supply
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="total-supply"
                  id="total-supply"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={exclusivity.totalSupply}
                  placeholder="Leave empty for unlimited supply"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <SubmitButton text="Save" pendingText="Saving…" />
      </div>
    </form>
  );
}; */

export default ExclusivityForm;
