import { ImageResponse, NextRequest } from 'next/server';

import { membershipUrl } from '../../../lib/utils';

const size = { width: 1024, height: 1024 };

const CardPreview = ({
  color,
  logoUrl,
  tier,
  tokenId,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  href,
}: {
  color: string;
  logoUrl: string;
  tier: string;
  tokenId: string;
  subscriptionStartTimestamp: string;
  subscriptionEndTimestamp: string;
  username: string;
  avatarUrl: string;
  oboleBalance: string;
  title: string;
  description: string;
  href: string;
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
            <p tw="-mb-0.5 text-xl font-bold tracking-tight text-gray-900">{tier} membership</p>
            <p tw="-mt-0.5 text-sm text-gray-700">Member #{tokenId} since 10/2022</p>
          </div>
          <div tw="flex items-center">
            <div tw="flex flex-col justify-center text-sm">
              <p tw="-mb-0.5 leading-none text-gray-900">{username}</p>
              <p tw="-mt-0.5 text-gray-600">{oboleBalance} $OBO</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img tw="ml-4 h-20 w-20 rounded-full" src={avatarUrl} alt={`${username} avatar`} />
          </div>
        </div>
        <div tw="flex flex-col">
          <p tw="text-2xl font-bold tracking-tight text-gray-900">{title}</p>
          <p tw="-mt-4 font-normal text-gray-700">{description}</p>
        </div>
        <a href={href} tw="text-cyan-500">
          {href}
        </a>
      </div>
    </div>
  </div>
);

export const GET = async (request: NextRequest) => {
  const color = request.nextUrl.searchParams.get('color') || 'cyan';
  const logoUrl =
    request.nextUrl.searchParams.get('logoUrl') || 'http://localhost:3000/img/avatar.jpg';
  const tier = request.nextUrl.searchParams.get('tier') || 'Free';
  const tokenId = request.nextUrl.searchParams.get('tokenId') || '1';
  const subscriptionStartTimestamp =
    request.nextUrl.searchParams.get('subscriptionStartTimestamp') || '0';
  const subscriptionEndTimestamp =
    request.nextUrl.searchParams.get('subscriptionEndTimestamp') || '0';
  const username = request.nextUrl.searchParams.get('username') || 'username';
  const avatarUrl =
    request.nextUrl.searchParams.get('avatarUrl') || 'http://localhost:3000/img/avatar.jpg';
  const oboleBalance = request.nextUrl.searchParams.get('oboleBalance') || '0';
  const title = request.nextUrl.searchParams.get('title') || 'Tribe Diamond';
  const description =
    request.nextUrl.searchParams.get('description') ||
    'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming.';
  const name = request.nextUrl.searchParams.get('name') || 'tribe-diamond';
  const { href } = membershipUrl(name);
  return new ImageResponse(
    (
      <CardPreview
        color={color}
        logoUrl={logoUrl}
        tier={tier}
        tokenId={tokenId}
        subscriptionStartTimestamp={subscriptionStartTimestamp}
        subscriptionEndTimestamp={subscriptionEndTimestamp}
        username={username}
        avatarUrl={avatarUrl}
        oboleBalance={oboleBalance}
        title={title}
        description={description}
        href={href}
      />
    ),
    size,
  );
};
