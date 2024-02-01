import { capitalize } from 'lodash';
import { format } from 'date-fns';

import { type CardTierName } from '@/app/lib/types';

const size = { width: 1024, height: 1024 };

const CardPreview = ({
  transform,
  color,
  logoUrl,
  tier,
  memberId,
  mintTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  obolBalance,
  title,
  description,
  slug,
}: {
  transform: string;
  color: string;
  logoUrl: string;
  tier: CardTierName;
  memberId: string;
  mintTimestamp: number;
  subscriptionEndTimestamp: number;
  username: string;
  avatarUrl: string;
  obolBalance: string;
  title: string;
  description: string;
  slug: string;
}) => (
  <div
    style={{ width: 1024, height: 418, transform }}
    className={`flex origin-top-left items-center justify-center w-[${size.width}px] h-[${size.height}px] bg-slate-50`}
  >
    <div
      className={`m-4 flex items-center rounded-lg border border-${color}-200 bg-${color}-50 shadow-2xl shadow-${color}-500/50`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={384}
        height={384}
        className="size-96 rounded-l-lg"
        src={logoUrl}
        alt={`${title} logo`}
      />
      <div
        style={{ width: size.width - 384 - 32 }}
        className="flex h-96 flex-col justify-between p-4 leading-normal"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold tracking-tight text-gray-900">
              {capitalize(tier)} membership
            </p>
            <p className="text-sm text-gray-700">
              Member #{memberId} since {format(new Date(mintTimestamp * 1000), 'MM/yyyy')}
              {subscriptionEndTimestamp === 0
                ? ''
                : ` expires ${format(new Date(subscriptionEndTimestamp * 1000), 'MM/yyyy')}`}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col justify-center text-sm">
              <p className="mb-1 leading-none text-gray-900">{username}</p>
              <p className="text-gray-600">{obolBalance} $OBOL</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={80}
              height={80}
              className="ml-4 size-20 rounded-full"
              src={avatarUrl}
              alt={`${username} avatar`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</p>
          <p className="font-normal text-gray-700">{description}</p>
        </div>
        <a href={`/creators/${slug}`} className={`text-${color}-500`}>
          {new URL(`/creators/${slug}`, process.env.NEXT_PUBLIC_BASE_URL).href}
        </a>
      </div>
    </div>
  </div>
);

export default CardPreview;
