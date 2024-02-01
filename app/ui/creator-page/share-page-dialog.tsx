'use client';
import Image from 'next/image';
import { LinkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import useContext from '@/app/ui/lib/context/hook';

const MetaImagePreview = ({ slug }: { slug: string }) => (
  <Image
    className="mb-4 rounded-md"
    src={`/creators/${slug}/twitter-image`}
    alt="Meta image for Coinnect creator"
    sizes="100vw"
    style={{
      width: '100%',
      height: 'auto',
    }}
    width={1200}
    height={630}
  />
);

const XIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 25"
    className={className}
    stroke="currentColor"
  >
    <path d="M13.604 11.469 20.889 3h-1.726l-6.326 7.353L7.784 3H1.957l7.64 11.12L1.957 23h1.727l6.68-7.765L15.7 23h5.827zm-2.365 2.748-.774-1.107-6.16-8.81h2.652l4.971 7.11.774 1.107 6.462 9.242h-2.652z"></path>
  </svg>
);

const ShareMenu = ({ slug }: { slug: string }) => {
  const creatorUrl = new URL(`/creators/${slug}`, process.env.NEXT_PUBLIC_BASE_URL);
  const twitterUrl = new URL('/intent/tweet', 'https://x.com');
  twitterUrl.searchParams.append('url', creatorUrl.href);
  twitterUrl.searchParams.append('text', 'Check out my Coinnect page!');
  return (
    <nav className="flex flex-1 flex-col" aria-label="Share menu">
      <ul role="list" className="-mx-2 space-y-1">
        <li>
          <button
            className="group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            onClick={() => navigator.clipboard.writeText(creatorUrl.href)}
          >
            <LinkIcon
              className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
              aria-hidden="true"
            />
            Copy link
          </button>
          <a
            href="/creators/epic-rabbits/twitter-image"
            download
            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            <ArrowDownTrayIcon
              className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
              aria-hidden="true"
            />
            Save image
          </a>
        </li>
        <li>
          <a
            href={twitterUrl.toString()}
            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            <XIcon
              className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
              aria-hidden="true"
            />
            Share on X
          </a>
        </li>
      </ul>
    </nav>
  );
};

const SharePageDialog = ({ slug }: { slug: string }) => {
  const {
    state: { sharePageModalOpen },
    closeSharePageModal,
  } = useContext();
  return (
    <Dialog open={sharePageModalOpen} onClose={closeSharePageModal}>
      <DialogTitle>Share your Coinnect page</DialogTitle>
      <DialogDescription>
        You can share your Coinnect page on X or via direct link.
      </DialogDescription>
      <DialogBody>
        <MetaImagePreview slug={slug} />
        <ShareMenu slug={slug} />
      </DialogBody>
      <DialogActions>
        <Button plain onClick={closeSharePageModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePageDialog;
