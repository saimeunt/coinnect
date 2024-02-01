import { formatUnits } from 'viem';

import { colors } from '@/app/lib/constants';

export const truncateAddress = (address: `0x${string}`) =>
  `${address.substring(0, 8)}…${address.substring(address.length - 8)}`;

const formatCurrency = (amount: number | bigint) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(amount)
    .replace(/(\.|,)00$/g, '');

export const formatObol = (amount: bigint) =>
  Number(formatUnits(amount, 9))
    .toFixed(2)
    .replace(/(\.|,)00$/g, '');
// export const formatObole = (amount: bigint) => formatUnits(amount, 9);

export const formatUSDC = (amount: bigint) => formatCurrency(BigInt(formatUnits(amount, 6)));

export const colorNumberToString = (colorNumber: number) => {
  const { name: color } = colors.find(({ id }) => id === colorNumber) as {
    id: number;
    name: string;
  };
  return color.toLowerCase();
};
