import { /* useReadContract,*/ useWriteContract } from 'wagmi';
import { getContract, stringToHex } from 'viem';

import abi from '@/app/lib/contracts/coinnect/abi';
import publicClient from '@/app/lib/public-client';
import {
  creatorAccountToRawCreatorAccount,
  rawCreatorAccountToCreatorAccount,
  userAccountToRawUserAccount,
  rawMembershipCardDataToMembershipCardData,
  exclusivityToRawExclusivity,
} from '@/app/lib/contracts/coinnect/utils';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type UserAccount } from '@/app/lib/models/user-account';
import { type SubscriptionDuration } from '@/app/lib/types';
import { type Exclusivity } from '@/app/lib/models/exclusivity';

const coinnectContract = getContract({
  address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
  abi,
  client: publicClient,
});

export const creatorAccountBySlug = async (slug: string) => {
  const rawCreatorAccount = await coinnectContract.read.creatorAccountBySlug([
    stringToHex(slug, { size: 32 }),
  ]);
  return rawCreatorAccount.id === stringToHex('', { size: 32 })
    ? null
    : rawCreatorAccountToCreatorAccount(rawCreatorAccount);
};

export const membershipCardData = async (tokenId: bigint) => {
  const rawMembershipCardData = await coinnectContract.read.membershipCardData([tokenId]);
  return rawMembershipCardData.tokenId === 0n
    ? null
    : rawMembershipCardDataToMembershipCardData(rawMembershipCardData);
};

export const membershipCardsByOwner = async (account: `0x${string}`) => {
  const rawMembershipCardData = await coinnectContract.read.membershipCardsByOwner([account]);
  return rawMembershipCardData
    .filter(({ tokenId }) => tokenId !== 0n)
    .map(rawMembershipCardDataToMembershipCardData);
};

export const membershipCardByOwnerAndCreatorAccountId = async (
  account: `0x${string}`,
  creatorAccountId: string,
) => {
  const rawMembershipCardData =
    await coinnectContract.read.membershipCardByOwnerAndCreatorAccountId([
      account,
      stringToHex(creatorAccountId, { size: 32 }),
    ]);
  return rawMembershipCardData.tokenId === 0n
    ? null
    : rawMembershipCardDataToMembershipCardData(rawMembershipCardData);
};

export const obolBalanceOf = async (account: `0x${string}`, obolId: bigint) =>
  coinnectContract.read.balanceOf([account, obolId]);

export const rewardsAmount = async (account: `0x${string}`, creatorAccountId: string) =>
  coinnectContract.read.rewardsAmount([account, stringToHex(creatorAccountId, { size: 32 })]);

export const payoutsAmount = async (account: `0x${string}`) =>
  coinnectContract.read.payoutsAmount([account]);

/* export const exclusivityById = (exclusivityId: string) =>
  coinnectContract.read.exclusivityById([stringToHex(exclusivityId, { size: 32 })]); */

export const exclusivityMintedCount = async (exclusivityIds: string[]) =>
  coinnectContract.read.exclusivityMintedCount([
    exclusivityIds.map((exclusivityId) => stringToHex(exclusivityId, { size: 32 })),
  ]);

export const useCreateCreatorAccount = (creatorAccount: CreatorAccount) => {
  const { data: hash, writeContract } = useWriteContract();
  const createCreatorAccount = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'createCreatorAccount',
      args: [creatorAccountToRawCreatorAccount(creatorAccount)],
    });
  return { hash, createCreatorAccount };
};

export const useUpdateCreatorAccount = (creatorAccount: CreatorAccount) => {
  const { data: hash, writeContract } = useWriteContract();
  const updateCreatorAccount = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'updateCreatorAccount',
      args: [creatorAccountToRawCreatorAccount(creatorAccount)],
    });
  return { hash, updateCreatorAccount };
};

export const useCreateUserAccount = (userAccount: UserAccount) => {
  const { data: hash, writeContract } = useWriteContract();
  const createUserAccount = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'createUserAccount',
      args: [userAccountToRawUserAccount(userAccount)],
    });
  return { hash, createUserAccount };
};

export const useUpdateUserAccount = (userAccount: UserAccount) => {
  const { data: hash, writeContract } = useWriteContract();
  const updateUserAccount = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'updateUserAccount',
      args: [userAccountToRawUserAccount(userAccount)],
    });
  return { hash, updateUserAccount };
};

/* export const useBalanceOfToken = (account: `0x${string}`, id: bigint) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [account, id],
  });
  return data;
}; */

export const useMintMembershipCard = (creatorAccountId: string, userAccount: UserAccount) => {
  const { data: hash, writeContract } = useWriteContract();
  const mintMembershipCard = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'mintMembershipCard',
      args: [stringToHex(creatorAccountId, { size: 32 }), userAccountToRawUserAccount(userAccount)],
    });
  return { hash, mintMembershipCard };
};

/* export const useMembershipCard = (userAddress: `0x${string}`, creatorAccountId: string) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'membershipCardsByOwner',
    args: [userAddress, stringToHex(creatorAccountId, { size: 32 })],
    // watch: true,
  });
  return data;
}; */

/* export const useMembershipCardData = (tokenId?: bigint) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'membershipCardData',
    args: [tokenId || 0n],
    // enabled: !!tokenId,
    // watch: true,
  });
  return data;
}; */

export const useDonate = (creatorAccountId: string, amount: bigint) => {
  const { data: hash, writeContract } = useWriteContract();
  const donate = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'donate',
      args: [stringToHex(creatorAccountId, { size: 32 }), amount],
    });
  return { hash, donate };
};

export const useSubscribe = (
  creatorAccountId: string,
  tier: string,
  subscriptionDuration: SubscriptionDuration,
) => {
  const { data: hash, writeContract } = useWriteContract();
  const subscribe = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'subscribe',
      args: [
        stringToHex(creatorAccountId, { size: 32 }),
        stringToHex(tier, { size: 32 }),
        subscriptionDuration,
      ],
    });
  return { hash, subscribe };
};

/* export const useRewardsAmount = (account: `0x${string}`, creatorAccountId: string) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'rewardsAmount',
    args: [account, stringToHex(creatorAccountId, { size: 32 })],
  });
  return data;
}; */

export const useClaimRewards = (creatorAccountId: string) => {
  const { data: hash, writeContract } = useWriteContract();
  const claimRewards = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'claimRewards',
      args: [stringToHex(creatorAccountId, { size: 32 })],
    });
  return { hash, claimRewards };
};

/* export const usePayoutsAmount = (account: `0x${string}`) => {
  const { data } = useReadContract({
    address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
    abi,
    functionName: 'payoutsAmount',
    args: [account],
  });
  return data;
}; */

export const useWithdraw = () => {
  const { data: hash, writeContract } = useWriteContract();
  const withdraw = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'withdraw',
    });
  return { hash, withdraw };
};

export const useCreateExclusivity = (exclusivity: Exclusivity) => {
  const { data: hash, writeContract } = useWriteContract();
  const createExclusivity = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'createExclusivity',
      args: [exclusivityToRawExclusivity(exclusivity)],
    });
  return { hash, createExclusivity };
};

export const useDeleteExclusivity = (exclusivityId: string) => {
  const { data: hash, writeContract } = useWriteContract();
  const deleteExclusivity = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'deleteExclusivity',
      args: [stringToHex(exclusivityId, { size: 32 })],
    });
  return { hash, deleteExclusivity };
};

export const useMintExclusivity = (exclusivityId: string) => {
  const { data: hash, writeContract } = useWriteContract();
  const mintExclusivity = () =>
    writeContract({
      address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
      abi,
      functionName: 'mintExclusivity',
      args: [stringToHex(exclusivityId, { size: 32 })],
    });
  return { hash, mintExclusivity };
};

export default coinnectContract;
