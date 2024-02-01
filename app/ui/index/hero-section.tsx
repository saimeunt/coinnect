import { Button } from '@/components/button';

const HeroSection = () => (
  <div className="py-24 text-center">
    <h1 className="mb-12 text-5xl font-semibold">Welcome to the new creator economy</h1>
    <Button
      // className="rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      color="indigo"
      className="px-8 py-4"
      href="/auth/sign-up?role=creator"
    >
      Get started
    </Button>
  </div>
);

export default HeroSection;
