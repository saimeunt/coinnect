import { getContract } from 'viem';
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';

import abi from './abi';
import publicClient from '../../public-client';

const stableCoinContract = getContract({
  address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const balanceOf = (account: `0x${string}`) => stableCoinContract.read.balanceOf([account]);

export const useBalanceOf = (account: `0x${string}`) =>
  useContractRead({
    address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [account],
    watch: true,
  });

export const allowance = (owner: `0x${string}`, spender: `0x${string}`) =>
  stableCoinContract.read.allowance([owner, spender]);

export const useAllowance = (account: `0x${string}`, spender: `0x${string}`) =>
  useContractRead({
    address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
    abi,
    functionName: 'allowance',
    args: [account, spender],
    watch: true,
  });

export const useApprove = (spender: `0x${string}`, amount: bigint) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
    abi,
    functionName: 'approve',
    args: [spender, amount],
    enabled: amount > 0,
  });
  const { data, write: approve } = useContractWrite(config);
  return { data, approve };
};

export default stableCoinContract;
