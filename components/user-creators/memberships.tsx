'use client';
import { useState, useEffect } from 'react';
import { OwnedNft } from 'alchemy-sdk';
// import useSWR from 'swr';

import { getNftsForOwner } from '../../lib/alchemy';
import MembershipCardsList from './membership-cards-list';

/* const fetcher = (functionName: string, address: `0x${string}`) => {
  console.log(functionName, address);
  if (functionName === 'getNftsForOwner') {
    return getNftsForOwner(address);
  }
}; */

const Memberships = ({ address }: { address: `0x${string}` }) => {
  // const { data, error, isLoading } = useSWR(['getNftsForOwner', address], fetcher);
  const [data, setData] = useState<OwnedNft[]>([]);
  // const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    getNftsForOwner(address).then((data) => {
      setData(data);
      // setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <MembershipCardsList ownedNfts={data} />;
};

export default Memberships;
