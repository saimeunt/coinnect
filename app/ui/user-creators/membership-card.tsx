import Link from 'next/link';
import Image from 'next/image';
import { capitalize } from 'lodash';

import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';
import { formatObol } from '@/app/lib/utils';
import { Badge } from '@/components/badge';

const MembershipCard = ({
  membershipCard: { tokenId, title, memberId, slug, color, tier, obolBalance },
}: {
  membershipCard: MembershipCardData;
}) => (
  <li className="relative">
    <Link href={`/user/creators/${slug}`}>
      <div className="group block w-full overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/membership-cards/${tokenId}?thumbnail=true`}
          alt={`${title} Membership Card #${memberId.toString()}`}
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
      </div>
    </Link>
    <div className="flex items-center justify-between">
      <Link href={`/user/creators/${slug}`}>
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
            <Badge color="yellow" className="ml-4">
              {formatObol(obolBalance)} $OBOL
            </Badge>
            {/* <span className="ml-4 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {formatObole(oboleBalance)} $OBO
            </span> */}
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
        <Image src="/img/opensea.svg" width={32} height={32} className="size-8" alt="opensea" />
      </a>
    </div>
  </li>
);

export default MembershipCard;
