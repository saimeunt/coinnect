import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

import { Button } from '@/components/button';
import SubmitButton from '@/app/ui/lib/submit-button';

const UnsavedBanner = ({ resetForm }: { resetForm: () => void }) => (
  <div className="flex items-center justify-between gap-x-6 bg-gray-50 px-6 py-2.5 sm:pr-3.5 lg:pl-8">
    <p className="text-sm leading-6">Your page has unsaved changes.</p>
    <div className="flex items-center gap-x-4">
      <Button outline onClick={resetForm}>
        Discard
      </Button>
      <SubmitButton text="Save" pendingText="Saving…" icon={<ArrowDownTrayIcon />} />
    </div>
  </div>
);

export default UnsavedBanner;
