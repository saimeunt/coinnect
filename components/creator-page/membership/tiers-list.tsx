const Tier = ({
  title,
  price,
  membersCount,
  description,
}: {
  title: string;
  price: number;
  membersCount: number;
  description: string;
}) => (
  <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div className="flex items-center justify-between px-4 py-5 sm:px-6">
      <p>{title}</p>
      <div>
        <p className="text-sm">{price === 0 ? 'Free' : `$${price} / month`}</p>
        <p className="text-xs">
          {membersCount} member{membersCount === 1 ? '' : 's'}
        </p>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const TiersList = () => (
  <div className="space-y-8 py-8">
    <Tier
      title="Free membership"
      price={0}
      membersCount={0}
      description="Access to free content."
    />
    <Tier
      title="Standard membership"
      price={5}
      membersCount={0}
      description="Access to exclusive content and more."
    />
    <Tier
      title="Premium membership"
      price={20}
      membersCount={0}
      description="Access to premium content and exclusivities."
    />
  </div>
);

export default TiersList;
