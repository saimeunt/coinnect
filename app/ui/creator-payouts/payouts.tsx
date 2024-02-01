import { BanknotesIcon } from '@heroicons/react/24/outline';

import { formatUSDC } from '@/app/lib/utils';
import WithdrawButton from '@/app/ui/creator-payouts/withdraw-button';

const Payouts = ({ userPayoutsAmount }: { userPayoutsAmount: bigint }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 text-center sm:p-6">
      <BanknotesIcon className="mx-auto mt-4 size-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        {userPayoutsAmount === 0n ? 'No' : formatUSDC(userPayoutsAmount)} outstanding payment
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {userPayoutsAmount === 0n ? 'No donations yet.' : 'Withdraw donations to your account now.'}
      </p>
      <div className="mt-6 flex justify-center">
        <WithdrawButton userPayoutsAmount={userPayoutsAmount} />
      </div>
    </div>
  </div>
);

export default Payouts;
