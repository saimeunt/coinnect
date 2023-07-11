import Link from 'next/link';

import MembershipForm from './membership-form';

const CreateMembership = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="mt-2 text-xl font-semibold text-gray-900">Create your membership</h3>
        <p className="mt-1 text-sm text-gray-500">
          Your page name is how people will know you and search for you.
          <br />
          You must also choose at least one interest.
          <br />
          You can always change it later.
        </p>
      </div>
      <MembershipForm />
      <p className="text-center text-sm text-gray-500">
        Not a creator?{' '}
        <Link className="text-indigo-600 hover:text-indigo-900" href="/">
          Go back
        </Link>
      </p>
    </div>
  );
};

export default CreateMembership;
