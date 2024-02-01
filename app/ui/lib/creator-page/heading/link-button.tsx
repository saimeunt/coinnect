'use client';
import { LinkIcon } from '@heroicons/react/20/solid';

const LinkButton = ({ slug }: { slug: string }) => {
  const { host, href, pathname } = new URL(`/creators/${slug}`, process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-0.5"
      onClick={() => navigator.clipboard.writeText(href)}
    >
      <LinkIcon className="-ml-0.5 mr-1.5 size-5 text-gray-400" aria-hidden="true" /> {host}
      {pathname}
    </button>
  );
};

export default LinkButton;
