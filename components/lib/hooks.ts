import { useState, useEffect } from 'react';
import { formatUnits, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

import { getNftsForOwner } from '../../lib/alchemy';
// import { balanceOf } from '../../lib/contracts/stablecoin/contract';
import { useBalanceOf, useAllowance } from '../../lib/contracts/stablecoin/contract';
import { useBalanceOfToken, useRewardsAmount } from '../../lib/contracts/tokens/contract';
import { ownedNftToMembershipCardNft } from '../../lib/utils';
import { MembershipCardNft } from '../../lib/types';

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

export const useAccountBalanceOfToken = (id: bigint) => {
  const { address } = useAccount();
  const { data } = useBalanceOfToken(address || zeroAddress, id);
  return data ? Number(Number(formatUnits(data, 9)).toFixed(4)) : 0;
};

export const useAccountRewardsAmount = (name: string) => {
  const { address } = useAccount();
  const { data } = useRewardsAmount(address || zeroAddress, name);
  // console.log(data);
  return data ? Number(Number(formatUnits(data, 9)).toFixed(4)) : 0;
};

/* export const useBalanceOf = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    setLoading(true);
    if (!address) {
      return;
    }
    balanceOf(address).then((rawBalance) => {
      setBalance(Number(formatUnits(rawBalance, 6)));
      setLoading(false);
    });
  }, [address]);
  return { balance, isLoading };
}; */

export const useMembershipCards = () => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<MembershipCardNft[]>([]);
  useEffect(() => {
    setLoading(true);
    if (!address) {
      return;
    }
    getNftsForOwner(address).then((data) => {
      setData(data.filter(({ balance }) => balance === 1).map(ownedNftToMembershipCardNft));
      setLoading(false);
    });
  }, [address]);
  return { membershipCards: data, isLoading };
};

export const useMembershipCard = (creatorName: string) => {
  const { membershipCards, isLoading } = useMembershipCards();
  const membershipCard = membershipCards.find(({ name }) => name === creatorName);
  return { membershipCard, isLoading };
};
