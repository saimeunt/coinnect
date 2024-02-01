import { type Exclusivity as ExclusivityModel } from '@/app/lib/models/exclusivity';
import Exclusivity from '@/app/ui/creator-exclusivities/exclusivity';

const ExclusivitiesList = ({ exclusivities }: { exclusivities: ExclusivityModel[] }) => (
  <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
    {exclusivities.map((exclusivity) => (
      <Exclusivity key={exclusivity.id} exclusivity={exclusivity} />
    ))}
  </div>
);

export default ExclusivitiesList;
