import Payouts from '@/app/ui/creator-payouts//payouts';
import { currentAddress } from '@/app/lib/session';
import { payoutsAmount } from '@/app/lib/contracts/coinnect/contract';

const CreatorPayouts = async () => {
  const address = await currentAddress();
  const userPayoutsAmount = await payoutsAmount(address);
  return (
    <div className="m-4">
      <h2 className="mb-8 text-xl font-bold leading-7">Payouts</h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Payouts userPayoutsAmount={userPayoutsAmount} />
        </div>
      </div>
    </div>
  );
};

export default CreatorPayouts;
