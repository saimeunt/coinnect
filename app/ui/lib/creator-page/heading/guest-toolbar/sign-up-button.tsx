import { Button } from '@/components/button';
import { UserPlusIcon } from '@heroicons/react/16/solid';

const SignUpButton = ({ slug }: { slug: string }) => (
  <Button outline href={`/new-user?creator=${slug}`}>
    <UserPlusIcon />
    Join community
  </Button>
);

export default SignUpButton;
