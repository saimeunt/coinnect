import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';
import { capitalize } from 'lodash';

const size = { width: 1024, height: 1024 };

const CardPreview = ({
  color,
  logoUrl,
  tier,
  memberId,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  name,
}: {
  color: string;
  logoUrl: string;
  tier: string;
  memberId: string;
  subscriptionStartTimestamp: string;
  subscriptionEndTimestamp: string;
  username: string;
  avatarUrl: string;
  oboleBalance: string;
  title: string;
  description: string;
  name: string;
}) => (
  <div tw={`flex items-center justify-center w-[${size.width}px] h-[${size.height}px] bg-slate-50`}>
    <div
      tw={`m-4 w-[${
        size.width - 32
      }px] flex items-center rounded-lg border border-${color}-200 bg-${color}-50 shadow-2xl shadow-${color}-500/50`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img tw="h-96 w-96 rounded-l-lg" src={logoUrl} alt={`${title} logo`} />
      <div
        tw={`flex w-[${size.width - 384 - 32}px] h-96 flex-col justify-between p-4 leading-normal`}
      >
        <div tw="flex items-center justify-between">
          <div tw="flex flex-col">
            <p tw="mb-0.5 text-xl font-bold tracking-tight text-gray-900">
              {capitalize(tier)} membership
            </p>
            <p tw="mt-0.5 text-sm text-gray-700">Member #{memberId} since 10/2022</p>
          </div>
          <div tw="flex items-center">
            <div tw="flex flex-col justify-center text-sm">
              <p tw="mb-0.5 leading-none text-gray-900">{username}</p>
              <p tw="mt-1.5 text-gray-600">{oboleBalance} $OBO</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img tw="ml-4 h-20 w-20 rounded-full" src={avatarUrl} alt={`${username} avatar`} />
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
  const color = request.nextUrl.searchParams.get('color') || 'red';
  const logoUrl =
    request.nextUrl.searchParams.get('logoUrl') || 'http://localhost:3000/img/avatar.jpg';
  const tier = request.nextUrl.searchParams.get('tier') || 'free';
  const memberId = request.nextUrl.searchParams.get('memberId') || '1';
  const subscriptionStartTimestamp =
    request.nextUrl.searchParams.get('subscriptionStartTimestamp') || '0';
  const subscriptionEndTimestamp =
    request.nextUrl.searchParams.get('subscriptionEndTimestamp') || '0';
  const username = request.nextUrl.searchParams.get('username') || 'username';
  const avatarUrl =
    request.nextUrl.searchParams.get('avatarUrl') || 'http://localhost:3000/img/avatar.jpg';
  const oboleBalance = request.nextUrl.searchParams.get('oboleBalance') || '0';
  const title = request.nextUrl.searchParams.get('title') || 'Title';
  const description = request.nextUrl.searchParams.get('description') || 'Description';
  const name = request.nextUrl.searchParams.get('name') || 'title';
  const fontResponse = await fetch(
    'https://github.com/google/fonts/blob/main/apache/roboto/static/Roboto-Regular.ttf?raw=true',
  );
  const fontData = await fontResponse.arrayBuffer();
  const svg = await satori(
    <CardPreview
      color={color}
      logoUrl={logoUrl}
      tier={tier}
      memberId={memberId}
      subscriptionStartTimestamp={subscriptionStartTimestamp}
      subscriptionEndTimestamp={subscriptionEndTimestamp}
      username={username}
      avatarUrl={avatarUrl}
      oboleBalance={oboleBalance}
      title={title}
      description={description}
      name={name}
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
