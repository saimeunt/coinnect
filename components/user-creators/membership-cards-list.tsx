import Link from 'next/link';
import Image from 'next/image';
import { capitalize } from 'lodash';
import { formatUnits } from 'viem';

import { TokenData } from '../../lib/types';
import { baseUrl } from '../../lib/utils';

const MembershipCard = ({
  membershipCard: { tokenId, title, memberId, name, color, tier, oboleBalance },
}: {
  membershipCard: TokenData;
}) => (
  <li className="relative">
    <Link href={`/user/creators/${name}`}>
      <div className="group block w-full overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl()}/api/membership-cards/${tokenId}?thumbnail=true`}
          alt=""
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
      </div>
    </Link>
    <div className="flex items-center justify-between">
      <Link href={`/user/creators/${name}`}>
        <div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {title} Membership Card #{memberId.toString()}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            <span
              className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-700 ring-1 ring-inset ring-${color}-600/10`}
            >
              {capitalize(tier)} membership
            </span>
            <span className="ml-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {formatUnits(oboleBalance, 9)} $OBO
            </span>
          </p>
        </div>
      </Link>
      <a
        href={
          new URL(
            `/assets/mumbai/${process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS}/${tokenId}`,
            'https://testnets.opensea.io',
          ).href
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/img/opensea.svg" width={32} height={32} className="h-8 w-8" alt="" />
      </a>
    </div>
  </li>
);

const MembershipCardsList = ({ membershipCards }: { membershipCards: TokenData[] }) => (
  <ul
    role="list"
    className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
  >
    {membershipCards.map((membershipCard) => (
      <MembershipCard key={membershipCard.tokenId.toString()} membershipCard={membershipCard} />
    ))}
  </ul>
);

export default MembershipCardsList;
