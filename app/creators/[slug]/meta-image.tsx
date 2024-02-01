import { ImageResponse } from 'next/og';

import { creatorAccountBySlug } from '@/app/lib/contracts/coinnect/contract';

export const size = { width: 1200, height: 630 };
export const alt = 'Meta image for Coinnect creator';
export const contentType = 'image/png';

const MetaImage = async ({ params }: { params: { slug: string } }) => {
  const creatorAccount = await creatorAccountBySlug(params.slug);
  const bannerUrl = creatorAccount
    ? creatorAccount.bannerUrl
    : new URL('/img/creators/default/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL).href;
  const avatarUrl = creatorAccount
    ? creatorAccount.avatarUrl
    : new URL('/img/creators/default/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL).href;
  return new ImageResponse(
    (
      <div tw={`relative flex w-[${size.width}px] h-[${size.height}px]`}>
        <div tw="absolute flex inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            tw="size-full"
            src={bannerUrl}
            alt="Meta image background"
            width={size.width}
            height={size.height}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          tw="size-48 absolute left-12 bottom-12 rounded-lg"
          src={avatarUrl}
          alt="Meta image avatar"
          width={160}
          height={160}
        />
      </div>
    ),
    size,
  );
};

export default MetaImage;
