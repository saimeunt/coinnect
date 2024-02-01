'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useBlockNumber, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { useUpdateEffect } from 'usehooks-ts';

import useContext from '@/app/ui/lib/context/hook';
import { useApprove } from '@/app/lib/contracts/stablecoin/contract';
import { useSubscribe } from '@/app/lib/contracts/coinnect/contract';
import { useAccountAllowance } from '@/app/ui/lib/hooks';
import { type SubscriptionDurationName, SubscriptionDurations } from '@/app/lib/types';
import { Button } from '@/components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Description, Label } from '@/components/fieldset';
import { Radio, RadioField, RadioGroup } from '@/components/radio';

const subscriptionDurationInMonths = {
  None: 0,
  Months1: 1,
  Months3: 3,
  Months6: 6,
  Months12: 12,
};

const pricePerTier = { free: 0, standard: 15, premium: 30 };

const subscriptions = (price: number) => [
  {
    duration: 'Months1',
    title: '1 month',
    description: 'Earn rewards daily.',
    price,
  },
  {
    duration: 'Months3',
    title: '3 months',
    description: 'Show your creator some love and earn more rewards daily.',
    price: price * 3,
  },
  {
    duration: 'Months6',
    title: '6 months',
    description: 'Trust your creator and earn event more rewards daily.',
    price: price * 6,
  },
  {
    duration: 'Months12',
    title: '1 year',
    description: 'Get serious about your engagement and earn an insane amount of rewards daily.',
    price: price * 12,
  },
];

const SubscribeDialog = ({ creatorAccountId }: { creatorAccountId: string }) => {
  const { isDisconnected } = useAccount();
  const {
    state: { subscribeModalOpen, tier },
    closeSubscribeModal,
  } = useContext();
  const [subscriptionDuration, setSubscriptionDuration] =
    useState<SubscriptionDurationName>('Months3');
  const price = pricePerTier[tier];
  const amount = (price * subscriptionDurationInMonths[subscriptionDuration]).toString();
  // console.log({ amount });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { allowance, refetch } = useAccountAllowance(
    process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
  );
  useUpdateEffect(() => {
    refetch();
  }, [blockNumber]);
  // console.log({ blockNumber, allowance, amount: BigInt(amount) });
  const approved = allowance === 0n ? false : BigInt(amount) <= allowance;
  // console.log({ approved });
  const { hash: approveHash, approve } = useApprove(
    process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    parseUnits(amount, 6),
  );
  const { hash: subscribeHash, subscribe } = useSubscribe(
    creatorAccountId,
    tier,
    SubscriptionDurations[subscriptionDuration],
  );
  // console.log(creatorAccountId, tier, SubscriptionDurations[subscriptionDuration]);
  const { isLoading: approveIsLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  const { isLoading: donateIsLoading, isFetched } = useWaitForTransactionReceipt({
    hash: subscribeHash,
  });
  const onClose = () => {
    closeSubscribeModal();
    setSubscriptionDuration('Months3');
  };
  const router = useRouter();
  useUpdateEffect(() => {
    router.refresh();
    onClose();
  }, [isFetched]);
  const isLoading = approveIsLoading || donateIsLoading;
  return (
    <Dialog open={subscribeModalOpen} onClose={onClose}>
      <DialogTitle>Subscribe to {tier} membership</DialogTitle>
      <DialogDescription>
        Subscribe to a paid membership to help this creator produce more content.
      </DialogDescription>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (approved) {
            subscribe();
          } else {
            approve();
          }
        }}
      >
        <DialogBody>
          <RadioGroup
            value={subscriptionDuration}
            onChange={(value) => setSubscriptionDuration(value as SubscriptionDurationName)}
            aria-label="Subscription duration"
          >
            {subscriptions(price).map((subscription) => (
              <RadioField key={subscription.duration}>
                <Radio color="indigo" value={subscription.duration} />
                <Label className="flex justify-between !justify-self-auto">
                  <span>
                    <span>{subscription.title}</span>
                    {subscription.duration === 'Months3' && (
                      <span className="ml-4 text-gray-500">POPULAR!</span>
                    )}
                  </span>
                  <span>${subscription.price}</span>
                </Label>
                <Description>{subscription.description}</Description>
              </RadioField>
            ))}
          </RadioGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button color="indigo" type="submit" disabled={isDisconnected || isLoading}>
            {approved
              ? `Subscrib${isLoading ? 'ing…' : 'e'}`
              : `Approv${isLoading ? 'ing' : 'e'} USDC${isLoading ? '…' : ''}`}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
  /* return (
    <Transition.Root show={subscribeModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          closeSubscribeModal();
          setSubscriptionDuration('Months3');
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="my-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Subscribe to {tier} membership
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Subscribe to a paid membership to help this creator produce more content.
                      </p>
                    </div>
                  </div>
                </div>
                <form
                  id="subscribe-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    if (approved) {
                      subscribe();
                    } else {
                      approve();
                    }
                  }}
                >
                  <RadioGroup value={subscriptionDuration} onChange={setSubscriptionDuration}>
                    <RadioGroup.Label className="sr-only">Subscription duration</RadioGroup.Label>
                    <div className="space-y-4">
                      {subscriptions(price).map((subscription) => (
                        <RadioGroup.Option
                          key={subscription.duration}
                          value={subscription.duration}
                          className={({ active }) =>
                            clsx(
                              active
                                ? 'border-indigo-600 ring-2 ring-indigo-600'
                                : 'border-gray-300',
                              'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label as="span" className="font-medium text-gray-900">
                                    {subscription.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description as="span" className="text-gray-500">
                                    {subscription.description}
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              <RadioGroup.Description
                                as="span"
                                className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                              >
                                <span className="font-medium text-gray-900">
                                  ${subscription.price}
                                </span>
                                {subscription.duration === 'Months3' && (
                                  <span className="ml-1 font-semibold text-gray-500 sm:ml-0">
                                    POPULAR!
                                  </span>
                                )}
                                // COMMENT <span className="ml-1 text-gray-500 sm:ml-0">/mo</span> 
                              </RadioGroup.Description>
                              <span
                                className={clsx(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-600' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg',
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    form="subscribe-form"
                    disabled={isLoading}
                    className={clsx(
                      {
                        'bg-indigo-300': isLoading,
                        'bg-indigo-600 hover:bg-indigo-500': !isLoading,
                      },
                      'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2',
                    )}
                  >
                    {approved
                      ? `Subscrib${isLoading ? 'ing…' : 'e'}`
                      : `Approv${isLoading ? 'ing' : 'e'} USDC${isLoading ? '…' : ''}`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      closeSubscribeModal();
                      setSubscriptionDuration('Months3');
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ); */
};

export default SubscribeDialog;
