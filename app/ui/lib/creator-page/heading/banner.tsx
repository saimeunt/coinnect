'use client';
import { PhotoIcon } from '@heroicons/react/20/solid';

import { type CreatorAccount } from '@/app/lib/models/creator-account';

const Banner = ({
  creatorAccount,
  bannerUrl,
  setBannerUrl,
  role,
}: {
  creatorAccount: CreatorAccount;
  bannerUrl: string;
  setBannerUrl: (bannerUrl: string) => void;
  role: 'creator' | 'user' | 'guest';
}) => (
  <div className="group relative flex items-center justify-center">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className="h-48 w-full object-cover lg:h-64"
      src={bannerUrl === '' ? creatorAccount.bannerUrl : bannerUrl}
      alt={creatorAccount.title}
    />
    {role === 'creator' && (
      <>
        <input
          type="file"
          id="banner"
          name="banner"
          onChange={(event) => {
            if (!event.target.files) {
              return;
            }
            const [banner] = event.target.files;
            if (!banner) {
              return;
            }
            setBannerUrl(URL.createObjectURL(banner));
          }}
          hidden
        />
        <label
          htmlFor="banner"
          className="absolute inline-flex cursor-pointer items-center gap-x-1.5 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-sm hover:!opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 group-hover:opacity-70"
        >
          <PhotoIcon className="-ml-0.5 size-5" aria-hidden="true" />
          Set cover
        </label>
      </>
    )}
  </div>
);

export default Banner;
