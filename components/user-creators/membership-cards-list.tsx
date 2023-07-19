import Link from 'next/link';
import { OwnedNft } from 'alchemy-sdk';

import { baseUrl } from '../../lib/utils';

const MembershipCard = ({ ownedNft }: { ownedNft: OwnedNft }) => {
  const nameAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'name',
  );
  const name = nameAttribute ? (nameAttribute.value as string) : '';
  const colorAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'color',
  );
  const color = colorAttribute ? (colorAttribute.value as string) : 'red';
  const tierAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'tier',
  );
  const tier = tierAttribute ? (tierAttribute.value as string) : 'free';
  const oboleBalanceAttribute = ownedNft.rawMetadata?.attributes?.find(
    ({ trait_type }) => trait_type === 'oboleBalance',
  );
  const oboleBalance = oboleBalanceAttribute ? (oboleBalanceAttribute.value as number) : 0;
  return (
    <li className="relative">
      <Link href={`/user/creators/${name}`}>
        <div className="group block w-full overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${baseUrl()}/api/membership-cards/${ownedNft.tokenId}?thumbnail=true`}
            alt=""
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {ownedNft.title}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {oboleBalance} $OBO
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-md capitalize bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-700 ring-1 ring-inset ring-${color}-600/10`}
          >
            {tier}
          </span>
        </div>
      </Link>
    </li>
  );
};

const MembershipCardsList = ({ ownedNfts }: { ownedNfts: OwnedNft[] }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
    >
      {ownedNfts.map((ownedNft) => (
        <MembershipCard key={ownedNft.tokenId} ownedNft={ownedNft} />
      ))}
    </ul>
  );
};

export default MembershipCardsList;
