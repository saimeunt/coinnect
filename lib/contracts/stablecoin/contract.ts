import { getContract } from 'viem';

import abi from './abi';
import publicClient from '../../public-client';

const stableCoinContract = getContract({
  address: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT_ADDRESS,
  abi,
  publicClient,
});

export const balanceOf = (account: `0x${string}`) => stableCoinContract.read.balanceOf([account]);

export default stableCoinContract;
