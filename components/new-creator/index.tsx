import Link from 'next/link';

import NewCreatorAccountForm from './new-creator-account-form';

const NewCreator = () => (
  <div>
    <div className="text-center">
      <h3 className="mt-2 text-xl font-semibold text-gray-900">Create your membership</h3>
      <p className="mt-1 text-sm text-gray-500">
        Your page title and page name is how people will know you and search for you.
        <br />
        You must also choose at least one interest.
        <br />
        You can always change it later.
      </p>
    </div>
    <NewCreatorAccountForm />
    <p className="text-center text-sm text-gray-500">
      Not a creator?{' '}
      <Link className="text-indigo-600 hover:text-indigo-900" href="/">
        Go back
      </Link>
    </p>
  </div>
);

export default NewCreator;
