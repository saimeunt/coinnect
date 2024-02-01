'use client';
import { PhotoIcon } from '@heroicons/react/20/solid';

import { Field } from '@/components/fieldset';

const ImageField = ({
  label,
  name,
  imageUrl,
  setImageUrl,
  disabled = false,
}: {
  label: string;
  name: string;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  disabled?: boolean;
}) => (
  <Field>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2 flex items-center gap-x-3">
      {imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="size-12" src={imageUrl} alt="image" />
        </>
      ) : (
        <PhotoIcon className="size-12 text-indigo-300" />
      )}
      <input
        type="file"
        id={name}
        name={name}
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
      {!disabled && (
        <label
          htmlFor={name}
          className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Upload
        </label>
      )}
    </div>
  </Field>
);

export default ImageField;
