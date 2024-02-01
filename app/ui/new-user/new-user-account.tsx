// import Link from 'next/link';

import type { CreatorAccount } from '@/app/lib/models/creator-account';
import NewUserAccountForm from '@/app/ui/new-user/new-user-account-form';

const NewUserAccount = ({ creatorAccount }: { creatorAccount: CreatorAccount | null }) => (
  <div>
    <NewUserAccountForm creatorAccount={creatorAccount} />
  </div>
);

export default NewUserAccount;
