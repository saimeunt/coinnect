'use client';
import { LinkIcon } from '@heroicons/react/20/solid';

const LinkButton = ({ host, href, pathname }: { host: string; href: string; pathname: string }) => (
  <button
    type="button"
    className="inline-flex items-center gap-x-0.5"
    onClick={() => navigator.clipboard.writeText(href)}
  >
    <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> {host}
    {pathname}
  </button>
);

export default LinkButton;
