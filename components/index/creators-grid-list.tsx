import Link from 'next/link';
import Image from 'next/image';

const creators = [
  {
    name: 'Tribe Diamonds',
    members: 118,
    source: '/img/creator1.jpg',
  },
  {
    name: 'JRNY Club',
    members: 5433,
    source: '/img/creator2.jpg',
  },
  {
    name: 'FREQUENCY PASS ®',
    members: 239,
    source: '/img/creator3.jpg',
  },
  {
    name: 'BENS Finale Trial of the Eyes',
    members: 185,
    source: '/img/creator4.jpg',
  },
  {
    name: 'Grumbies Eternal Entry',
    members: 775,
    source: '/img/creator5.jpg',
  },
  {
    name: 'Applied Primate Keycard',
    members: 1505,
    source: '/img/creator6.jpg',
  },
  {
    name: 'Gorilla Mansion Origin',
    members: 462,
    source: '/img/creator7.jpg',
  },
  {
    name: 'MetaRides Pit Pass Memberships',
    members: 98,
    source: '/img/creator8.jpg',
  },
];

const CreatorsGridList = () => (
  <ul
    role="list"
    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  >
    {creators.map((creator) => (
      <li key={creator.source} className="relative">
        <Link href="/creators/tribe-diamond">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <Image
              src={creator.source}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            {/* <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {creator.name}</span>
            </button> */}
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {creator.name}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {creator.members} member{creator.members === 1 ? '' : 's'}
          </p>
        </Link>
      </li>
    ))}
  </ul>
);

export default CreatorsGridList;
