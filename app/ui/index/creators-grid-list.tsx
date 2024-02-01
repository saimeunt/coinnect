import Link from 'next/link';
import Image from 'next/image';

const creators = [
  {
    name: 'tribe-diamonds',
    title: 'Tribe Diamonds',
    membersCount: 118,
    avatarUrl: '/img/creators/tribe-diamonds/avatar.jpg',
  },
  {
    name: 'jrny-club-official',
    title: 'JRNY Club',
    membersCount: 5433,
    avatarUrl: '/img/creators/jrny-club-official/avatar.jpg',
  },
  {
    name: 'frequencypass',
    title: 'FREQUENCY PASS ®',
    membersCount: 239,
    avatarUrl: '/img/creators/frequencypass/avatar.jpg',
  },
  {
    name: 'bens-trial-of-eyes',
    title: 'BENS Finale Trial of the Eyes',
    membersCount: 185,
    avatarUrl: '/img/creators/bens-trial-of-eyes/avatar.jpg',
  },
  {
    name: 'grumbies-eternal-entry',
    title: 'Grumbies Eternal Entry',
    membersCount: 775,
    avatarUrl: '/img/creators/grumbies-eternal-entry/avatar.jpg',
  },
  {
    name: 'applied-primate-keycard',
    title: 'Applied Primate Keycard',
    membersCount: 1505,
    avatarUrl: '/img/creators/applied-primate-keycard/avatar.jpg',
  },
  {
    name: 'gorilla-mansion',
    title: 'Gorilla Mansion Origin',
    membersCount: 462,
    avatarUrl: '/img/creators/gorilla-mansion/avatar.jpg',
  },
  {
    name: 'metarides-pit-pass',
    title: 'MetaRides Pit Pass Memberships',
    membersCount: 98,
    avatarUrl: '/img/creators/metarides-pit-pass/avatar.jpg',
  },
];

const CreatorsGridList = () => (
  <ul
    role="list"
    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  >
    {creators.map(({ name, title, membersCount, avatarUrl }) => (
      <li key={avatarUrl} className="relative">
        <Link href={`/creators/${name}`}>
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <Image
              src={avatarUrl}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            {/* <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {name}</span>
            </button> */}
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {title}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {membersCount} member{membersCount === 1 ? '' : 's'}
          </p>
        </Link>
      </li>
    ))}
  </ul>
);

export default CreatorsGridList;
