import { useState, useEffect } from 'react';
import { formatUnits, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

import { getMembershipCards } from '../../lib/alchemy';
import { useBalanceOf, useAllowance } from '../../lib/contracts/stablecoin/contract';
import {
  useMembershipCard,
  useGetTokenData,
  useBalanceOfToken,
  useRewardsAmount,
  usePayoutsAmount,
} from '../../lib/contracts/tokens/contract';
import { rawTokenDataToTokenData } from '../../lib/utils';
import { TokenData } from '../../lib/types';

export const useAccountBalanceOf = () => {
  const { address } = useAccount();
  const { data } = useBalanceOf(address || zeroAddress);
  return data ? Number(formatUnits(data, 6)) : 0;
};

export const useAccountAllowance = (spender: `0x${string}`) => {
  const { address } = useAccount();
  const { data } = useAllowance(address || zeroAddress, spender);
  return data ? Number(formatUnits(data, 6)) : 0;
};

export const useAccountMembershipCard = (creatorName: string) => {
  const { address } = useAccount();
  const { data: tokenId } = useMembershipCard(address || zeroAddress, creatorName);
  const { data: rawTokenData } = useGetTokenData(tokenId);
  return rawTokenData ? rawTokenDataToTokenData(rawTokenData) : undefined;
};

export const useAccountBalanceOfToken = (id: bigint) => {
  const { address } = useAccount();
  const { data } = useBalanceOfToken(address || zeroAddress, id);
  return data ? Number(Number(formatUnits(data, 9)).toFixed(4)) : 0;
};

export const useAccountRewardsAmount = (name: string) => {
  const { address } = useAccount();
  const { data } = useRewardsAmount(address || zeroAddress, name);
  return data ? Number(Number(formatUnits(data, 9)).toFixed(4)) : 0;
};

export const useAccountPayoutsAmount = () => {
  const { address } = useAccount();
  const { data } = usePayoutsAmount(address || zeroAddress);
  return data ? Number(formatUnits(data, 6)) : 0;
};

export const useAccountMembershipCards = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<TokenData[]>([]);
  useEffect(() => {
    setLoading(true);
    if (!address) {
      return;
    }
    getMembershipCards(address).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [address]);
  return { membershipCards: data, isLoading };
};
