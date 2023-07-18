import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { getContract, stringToHex } from 'viem';

import abi from './abi';
import publicClient from '../../public-client';
import { rawMembershipCardDataToMembershipCardData } from '../../utils';

const tokensContract = getContract({
  address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const getMembershipCardData = async (tokenId: bigint) => {
  const rawMembershipCardData = await tokensContract.read.getMembershipCardData([tokenId]);
  return rawMembershipCardDataToMembershipCardData(rawMembershipCardData);
};

export const useMintMembershipCard = (name: string) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'mintMembershipCard',
    args: [stringToHex(name, { size: 32 })],
  });
  const { data, write: mintMembershipCard } = useContractWrite(config);
  return { data, mintMembershipCard };
};

export default tokensContract;
