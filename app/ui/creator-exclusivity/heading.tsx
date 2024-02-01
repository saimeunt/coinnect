import { type Exclusivity } from '@/app/lib/models/exclusivity';
import PublishButton from '@/app/ui/creator-exclusivity/publish-button';

const Heading = ({ exclusivity }: { exclusivity: Exclusivity }) => (
  <div className="mb-8 md:flex md:items-center md:justify-between">
    <div className="min-w-0 flex-1">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {exclusivity.title}
      </h2>
    </div>
    <div className="mt-4 flex md:ml-4 md:mt-0">
      <PublishButton exclusivity={exclusivity} />
    </div>
  </div>
);

export default Heading;
