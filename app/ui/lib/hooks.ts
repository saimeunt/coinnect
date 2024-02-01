// import { useState, useEffect } from 'react';
// import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

// import { getMembershipCards } from '@/app/lib/alchemy';
import { useAllowance } from '@/app/lib/contracts/stablecoin/contract';
/* import {
  useMembershipCard,
  useMembershipCardData,
  useBalanceOfToken,
  useRewardsAmount,
  usePayoutsAmount,
} from '@/app/lib/contracts/coinnect/contract'; */
// import { formatObole } from '@/app/lib/utils';
// import { rawMembershipCardDataToMembershipCardData } from '@/app/lib/contracts/coinnect/utils';
// import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';

const invalidAddress = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';

/* export const useAccountBalanceOf = () => {
  const { address } = useAccount();
  const balanceOf = useBalanceOf(address || invalidAddress);
  return balanceOf ? BigInt(formatUnits(balanceOf, 6)) : 0n;
}; */

export const useAccountAllowance = (spender: `0x${string}`) => {
  const { address } = useAccount();
  const { allowance, refetch } = useAllowance(address || invalidAddress, spender);
  return { allowance: allowance || 0n, refetch };
  // return { allowance: allowance ? BigInt(formatUnits(allowance, 6)) : 0n, refetch };
};

/* export const useAccountMembershipCard = (creatorName: string) => {
  const { address } = useAccount();
  const tokenId = useMembershipCard(address || invalidAddress, creatorName);
  const rawTokenData = useMembershipCardData(tokenId);
  return rawTokenData ? rawMembershipCardDataToMembershipCardData(rawTokenData) : undefined;
}; */

/* export const useAccountBalanceOfToken = (id: bigint) => {
  const { address } = useAccount();
  const balanceOf = useBalanceOfToken(address || invalidAddress, id);
  return balanceOf ? formatObole(balanceOf) : '0';
}; */

/* export const useAccountRewardsAmount = (name: string) => {
  const { address } = useAccount();
  const rewardsAmount = useRewardsAmount(address || invalidAddress, name);
  return rewardsAmount ? formatObole(rewardsAmount) : '0';
}; */

/* export const useAccountPayoutsAmount = () => {
  const { address } = useAccount();
  const payoutsAmount = usePayoutsAmount(address || invalidAddress);
  return payoutsAmount ? BigInt(formatUnits(payoutsAmount, 6)) : 0n;
}; */

/* export const useAccountMembershipCards = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<MembershipCardData[]>([]);
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
}; */
