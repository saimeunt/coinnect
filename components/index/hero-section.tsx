import Link from 'next/link';

const HeroSection = () => (
  <div className="py-24 text-center">
    <h1 className="mb-12 text-5xl font-semibold">Welcome to the new creator economy</h1>
    <Link
      className="rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      href="/auth/sign-up?role=creator"
    >
      Get started
    </Link>
  </div>
);

export default HeroSection;
