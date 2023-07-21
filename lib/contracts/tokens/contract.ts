import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { getContract, stringToHex } from 'viem';

import abi from './abi';
import publicClient from '../../public-client';
import { rawTokenDataToTokenData } from '../../utils';
import { SubscriptionDuration } from '../../types';

const tokensContract = getContract({
  address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const getTokenData = async (tokenId: bigint) => {
  const rawMembershipCardData = await tokensContract.read.getTokenData([tokenId]);
  return rawTokenDataToTokenData(rawMembershipCardData);
};

export const useBalanceOfToken = (account: `0x${string}`, id: bigint) =>
  useContractRead({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [account, id],
    watch: true,
  });

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

export const useDonate = (name: string, amount: bigint) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'donate',
    args: [stringToHex(name, { size: 32 }), amount],
    enabled: amount > 0,
  });
  const { data, write: donate } = useContractWrite(config);
  return { data, donate };
};

export const useSubscribe = (
  name: string,
  tier: string,
  subscriptionDuration: SubscriptionDuration,
) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'subscribe',
    args: [stringToHex(name, { size: 32 }), stringToHex(tier, { size: 32 }), subscriptionDuration],
  });
  const { data, write: subscribe } = useContractWrite(config);
  return { data, subscribe };
};

export const useRewardsAmount = (account: `0x${string}`, name: string) =>
  useContractRead({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'rewardsAmount',
    args: [account, stringToHex(name, { size: 32 })],
    watch: true,
  });

export const useClaimRewards = (name: string) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'claimRewards',
    args: [stringToHex(name, { size: 32 })],
  });
  const { data, write: claimRewards } = useContractWrite(config);
  return { data, claimRewards };
};

export const useWithdraw = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
    abi,
    functionName: 'withdraw',
  });
  const { data, write: withdraw } = useContractWrite(config);
  return { data, withdraw };
};

export default tokensContract;
