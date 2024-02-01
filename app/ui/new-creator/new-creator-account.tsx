import Link from 'next/link';

import NewCreatorAccountForm from '@/app/ui/new-creator/new-creator-account-form';

const NewCreatorAccount = () => (
  <div>
    <NewCreatorAccountForm />
    <p className="text-center text-sm text-gray-500">
      Not a creator?{' '}
      <Link className="text-indigo-600 hover:text-indigo-900" href="/">
        Go back
      </Link>
    </p>
  </div>
);

export default NewCreatorAccount;
