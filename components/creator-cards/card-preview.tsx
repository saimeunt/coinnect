const size = { width: 1024, height: 1024 };

const CardPreview = ({
  color,
  logoUrl,
  tier,
  tokenId,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  href,
}: {
  color: string;
  logoUrl: string;
  tier: string;
  tokenId: string;
  subscriptionStartTimestamp: string;
  subscriptionEndTimestamp: string;
  username: string;
  avatarUrl: string;
  oboleBalance: string;
  title: string;
  description: string;
  href: string;
}) => (
  <div
    style={{ width: 1024, height: 418 }}
    className={`flex items-center justify-center w-[${size.width}px] h-[${size.height}px] bg-slate-50`}
  >
    <div
      className={`m-4 flex items-center rounded-lg border border-${color}-200 bg-${color}-50 shadow-2xl shadow-${color}-500/50`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-96 w-96 rounded-l-lg" src={logoUrl} alt={`${title} logo`} />
      <div className="flex h-96 flex-col justify-between p-4 leading-normal">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold tracking-tight text-gray-900">{tier} membership</p>
            <p className="text-sm text-gray-700">Member #{tokenId} since 10/2022</p>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col justify-center text-sm">
              <p className="mb-1 leading-none text-gray-900">{username}</p>
              <p className="text-gray-600">{oboleBalance} $OBO</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="ml-4 h-20 w-20 rounded-full"
              src={avatarUrl}
              alt={`${username} avatar`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</p>
          <p className="font-normal text-gray-700">{description}</p>
        </div>
        <a href={href} className="text-cyan-500">
          {href}
        </a>
      </div>
    </div>
  </div>
);

const CardPreview2 = ({
  color,
  logoUrl,
  tier,
  tokenId,
  subscriptionStartTimestamp,
  subscriptionEndTimestamp,
  username,
  avatarUrl,
  oboleBalance,
  title,
  description,
  href,
}: {
  color: string;
  logoUrl: string;
  tier: string;
  tokenId: string;
  subscriptionStartTimestamp: string;
  subscriptionEndTimestamp: string;
  username: string;
  avatarUrl: string;
  oboleBalance: string;
  title: string;
  description: string;
  href: string;
}) => {
  const scheme = `http${process.env.NODE_ENV !== 'production' ? '' : 's'}`;
  const url = new URL('/api/card-preview', `${scheme}://${process.env.VERCEL_URL}`);
  url.searchParams.append('color', color);
  url.searchParams.append('logoUrl', logoUrl);
  url.searchParams.append('tier', tier);
  url.searchParams.append('tokenId', tokenId);
  url.searchParams.append('subscriptionStartTimestamp', subscriptionStartTimestamp);
  url.searchParams.append('subscriptionEndTimestamp', subscriptionEndTimestamp);
  url.searchParams.append('username', username);
  url.searchParams.append('avatarUrl', avatarUrl);
  url.searchParams.append('oboleBalance', oboleBalance);
  url.searchParams.append('title', title);
  url.searchParams.append('description', description);
  url.searchParams.append('href', href);
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="h-[768px] w-[768px]" src={url.href} alt="Card Preview" />;
  /* return (
    <Image
      className="h-[512px] w-[512px]"
      src={url.href}
      alt="Card Preview"
      width={512}
      height={512}
    />
  ); */
};

export default CardPreview;
