import Link from 'next/link';

const CTASection = () => (
  <div className="py-12 text-center">
    <h2 className="mb-12 text-4xl font-semibold">Take ownership of your creativity</h2>
    <Link
      className="rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      href="/auth/sign-up"
    >
      Start paid membership
    </Link>
  </div>
);

export default CTASection;
