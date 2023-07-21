import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';
import { capitalize } from 'lodash';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import { colors } from '../../../../lib/constants';
import { getTokenData } from '../../../../lib/contracts/tokens/contract';

// const size = { width: 1024, height: 1024 };

const CardPreview = ({
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  name,
  size,
}: {
  color: string;
  logoUrl: string;
  tier: string;
  memberId: string;
  mintTimestamp: number;
  subscriptionEndTimestamp: number;
  username: string;
  avatarUrl: string;
  oboleBalance: string;
  title: string;
  description: string;
  name: string;
  size: { width: number; height: number };
}) => (
  <div tw={`flex items-center justify-center w-[${size.width}px] h-[${size.height}px] bg-slate-50`}>
    <div
      tw={`m-4 w-[${
        size.width - 32
      }px] flex items-center rounded-lg border border-${color}-200 bg-${color}-50 shadow-2xl shadow-${color}-500/50`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={384}
        height={384}
        tw="h-96 w-96 rounded-l-lg"
        src={logoUrl}
        alt={`${title} logo`}
      />
      <div
        tw={`flex w-[${size.width - 384 - 32}px] h-96 flex-col justify-between p-4 leading-normal`}
      >
        <div tw="flex items-center justify-between">
          <div tw="flex flex-col">
            <p tw="mb-0.5 text-xl font-bold tracking-tight text-gray-900">
              {capitalize(tier)} membership
            </p>
            <p tw="mt-0.5 text-sm text-gray-700">
              Member #{memberId} since {format(new Date(mintTimestamp * 1000), 'MM/yyyy')}
              {subscriptionEndTimestamp === 0
                ? ''
                : ` expires ${format(new Date(subscriptionEndTimestamp * 1000), 'MM/yyyy')}`}
            </p>
          </div>
          <div tw="flex items-center">
            <div tw="flex flex-col justify-center text-sm">
              <p tw="mb-0.5 leading-none text-gray-900">{username}</p>
              <p tw="mt-1.5 text-gray-600">{oboleBalance} $OBO</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={80}
              height={80}
              tw="ml-4 h-20 w-20 rounded-full"
              src={avatarUrl}
              alt={`${username} avatar`}
            />
          </div>
        </div>
        <div tw="flex flex-col">
          <p tw="text-2xl font-bold tracking-tight text-gray-900">{title}</p>
          <p tw="mt-1 font-normal text-gray-700">{description}</p>
        </div>
        <a href={`${process.env.NEXT_PUBLIC_DAPP_URL}/creators/${name}`} tw={`text-${color}-500`}>
          {process.env.NEXT_PUBLIC_DAPP_URL}/creators/{name}
        </a>
      </div>
    </div>
  </div>
);

export const GET = async (request: NextRequest) => {
  const thumbnail = request.nextUrl.searchParams.get('thumbnail') === 'true';
  const size = thumbnail ? { width: 1024, height: 384 + 32 } : { width: 1024, height: 1024 };
  const [, , , tokenIdString] = request.nextUrl.pathname.split('/');
  const tokenId = BigInt(tokenIdString);
  const {
    color: colorNumber,
    logoUrl,
    tier,
    memberId,
    mintTimestamp,
    subscriptionEndTimestamp,
    username,
    avatarUrl,
    oboleBalance,
    title,
    description,
    name,
  } = await getTokenData(tokenId);
  const { name: color } = colors.find(({ id }) => id === colorNumber) as {
    id: number;
    name: string;
  };
  const fontResponse = await fetch(
    'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-Regular.ttf?raw=true',
  );
  const fontData = await fontResponse.arrayBuffer();
  const svg = await satori(
    <CardPreview
      color={color.toLowerCase()}
      logoUrl={logoUrl}
      tier={tier}
      memberId={memberId.toString()}
      mintTimestamp={Number(mintTimestamp)}
      subscriptionEndTimestamp={Number(subscriptionEndTimestamp)}
      username={username}
      avatarUrl={avatarUrl}
      oboleBalance={formatUnits(oboleBalance, 9)}
      title={title}
      description={description}
      name={name}
      size={size}
    />,
    {
      ...size,
      fonts: [
        {
          name: 'Roboto-Regular',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
  return new NextResponse(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
