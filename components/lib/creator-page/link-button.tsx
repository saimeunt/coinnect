'use client';
import { LinkIcon } from '@heroicons/react/20/solid';

import { baseUrl } from '../../../lib/utils';

const LinkButton = ({ name }: { name: string }) => {
  const { host, href, pathname } = new URL(`/creators/${name}`, baseUrl());
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-0.5"
      onClick={() => navigator.clipboard.writeText(href)}
    >
      <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> {host}
      {pathname}
    </button>
  );
};

export default LinkButton;
