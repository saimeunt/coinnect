import Link from 'next/link';
// import Image from 'next/image';

import { type Exclusivity as ExclusivityModel } from '@/app/lib/models/exclusivity';
import { formatObol } from '@/app/lib/utils';

const Exclusivity = ({
  exclusivity: { id, title, description, imageUrl, minted, price, totalSupply },
}: {
  exclusivity: ExclusivityModel;
}) => (
  <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div className="bg-gray-200 group-hover:opacity-75">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={title} className="size-full object-cover object-center" />
    </div>
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <h3 className="text-sm font-medium text-gray-900">
        <Link href={`/creator/exclusivities/${id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
          {title}
        </Link>
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex flex-1 flex-col justify-end">
        <p className="text-sm italic text-gray-500">
          {minted.toString()}
          {totalSupply ? ` / ${totalSupply}` : ''} minted
        </p>
        <p className="text-base font-medium text-gray-900">{formatObol(BigInt(price))} $OBOL</p>
      </div>
    </div>
  </div>
);

export default Exclusivity;
