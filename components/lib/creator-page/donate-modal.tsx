'use client';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useWaitForTransaction } from 'wagmi';
import { parseUnits } from 'viem';
import clsx from 'clsx';

import useContext from '../context/hook';
import { useApprove } from '../../../lib/contracts/stablecoin/contract';
import { useDonate } from '../../../lib/contracts/tokens/contract';
import { useAccountAllowance, useAccountBalanceOf } from '../hooks';

const DonateModal = ({ name }: { name: string }) => {
  const {
    state: { donateModalOpen },
    closeDonateModal,
  } = useContext();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [amount, setAmount] = useState('');
  const balance = useAccountBalanceOf();
  const allowance = useAccountAllowance(process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS);
  // console.log({ allowance, amount: Number(amount || '0') });
  const approved = allowance === 0 ? false : Number(amount || '0') <= allowance;
  // console.log({ approved });
  const { data: approveData, approve } = useApprove(
    process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    parseUnits((Number(amount) + 1).toString(), 6),
  );
  const { data: donateData, donate } = useDonate(name, parseUnits(amount, 6));
  const { isLoading: approveIsLoading } = useWaitForTransaction({ hash: approveData?.hash });
  const { isLoading: donateIsLoading } = useWaitForTransaction({
    hash: donateData?.hash,
    onSuccess: () => {
      closeDonateModal();
      setAmount('');
    },
  });
  const isLoading = approveIsLoading || donateIsLoading;
  return (
    <Transition.Root show={donateModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeDonateModal}
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
                      Make a donation
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Donate to help this creator produce more content.
                      </p>
                    </div>
                  </div>
                </div>
                <form
                  id="donate-form"
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    if (approved) {
                      donate?.();
                    } else {
                      approve?.();
                    }
                  }}
                >
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Amount
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        min={1}
                        max={balance}
                        step={1}
                        name="amount"
                        id="amount"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0"
                        aria-describedby="amount-currency"
                        required
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id="amount-currency">
                          USDC
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    form="donate-form"
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
                      ? `Donat${isLoading ? 'ing…' : 'e'}`
                      : `Approv${isLoading ? 'ing' : 'e'} USDC${isLoading ? '…' : ''}`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={closeDonateModal}
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
  );
};

export default DonateModal;
