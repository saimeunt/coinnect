import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { getContract, stringToHex } from 'viem';

import abi from './abi';
import publicClient from '../../public-client';
import {
  rawCreatorAccountToCreatorAccount,
  creatorAccountToRawCreatorAccount,
  userAccountToRawUserAccount,
} from '../../utils';
import { CreatorAccount, UserAccount } from '../../types';

const accountsContract = getContract({
  address: process.env.NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const getCreatorAccountByName = async (name: string) => {
  const rawCreatorAccount = await accountsContract.read.getCreatorAccountByName([
    stringToHex(name, { size: 32 }),
  ]);
  return rawCreatorAccountToCreatorAccount(rawCreatorAccount);
};

export const useCreateCreatorAccount = (creatorAccount: CreatorAccount, enabled: boolean) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS,
    abi,
    functionName: 'createCreatorAccount',
    args: [creatorAccountToRawCreatorAccount(creatorAccount)],
    enabled,
  });
  const { data, write: createCreatorAccount } = useContractWrite(config);
  return { data, createCreatorAccount };
};

export const useUpdateCreatorAccount = (creatorAccount: CreatorAccount, enabled: boolean) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS,
    abi,
    functionName: 'updateCreatorAccount',
    args: [creatorAccountToRawCreatorAccount(creatorAccount)],
    enabled,
  });
  const { data, write: updateCreatorAccount } = useContractWrite(config);
  return { data, updateCreatorAccount };
};

export const useCreateUserAccount = (userAccount: UserAccount) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS,
    abi,
    functionName: 'createUserAccount',
    args: [userAccountToRawUserAccount(userAccount)],
  });
  const { data, write: createUserAccount } = useContractWrite(config);
  return { data, createUserAccount };
};

export const useUpdateUserAccount = (userAccount: UserAccount) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ACCOUNTS_CONTRACT_ADDRESS,
    abi,
    functionName: 'updateUserAccount',
    args: [userAccountToRawUserAccount(userAccount)],
  });
  const { data, write: updateUserAccount } = useContractWrite(config);
  return { data, updateUserAccount };
};

export default accountsContract;
