import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { getContract, stringToHex } from 'viem';

import { abi } from './abi';
import publicClient from './public-client';
import { rawMembershipToMembership } from './utils';
import { Membership } from './types';

const contract = getContract({
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const getMembershipByName = async (name: string) => {
  const rawMembership = await contract.read.getMembershipByName([stringToHex(name, { size: 32 })]);
  return rawMembershipToMembership(rawMembership);
};

export const useCreateMembership = (membership: Membership) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: 'createMembership',
    args: [
      { ...membership, name: stringToHex(membership.name, { size: 32 }), interests: BigInt(0) },
    ],
  });
  const { data, write: createMembership } = useContractWrite(config);
  return { data, createMembership };
};

export const useUpdateMembership = (membership: Membership) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: 'updateMembership',
    args: [
      { ...membership, name: stringToHex(membership.name, { size: 32 }), interests: BigInt(0) },
    ],
  });
  const { data, write: updateMembership } = useContractWrite(config);
  return { data, updateMembership };
};

export default contract;
