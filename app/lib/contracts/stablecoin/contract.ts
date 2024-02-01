import { getContract } from 'viem';
import { useReadContract, useWriteContract } from 'wagmi';

import abi from '@/app/lib/contracts/stablecoin/abi';
import publicClient from '@/app/lib/public-client';

const stableCoinContract = getContract({
  address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
  abi,
  client: publicClient,
});

export const balanceOf = async (account: `0x${string}`) =>
  stableCoinContract.read.balanceOf([account]);

/* export const useBalanceOf = (account: `0x${string}`) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [account],
  });
  return data;
}; */

export const allowance = (owner: `0x${string}`, spender: `0x${string}`) =>
  stableCoinContract.read.allowance([owner, spender]);

export const useAllowance = (account: `0x${string}`, spender: `0x${string}`) => {
  const { data, refetch } = useReadContract({
    address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
    abi,
    functionName: 'allowance',
    args: [account, spender],
  });
  return { allowance: data, refetch };
};

export const useApprove = (spender: `0x${string}`, amount: bigint) => {
  const { data: hash, writeContract } = useWriteContract();
  const approve = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
      abi,
      functionName: 'approve',
      args: [spender, amount],
    });
  return { hash, approve };
};

export default stableCoinContract;
