import { Alchemy, Network, NftTokenType } from 'alchemy-sdk';

import { baseUrl } from './utils';

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
});

export const getNftsForOwner = async (address: `0x${string}`) => {
  if (process.env.NODE_ENV !== 'production') {
    return [
      {
        contract: {
          address: process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS,
          tokenType: NftTokenType.ERC1155,
        },
        tokenId: '2',
        tokenType: NftTokenType.ERC1155,
        title: 'Epic Rabbits Membership Card #1',
        description: '',
        timeLastUpdated: new Date().toISOString(),
        metadataError: undefined,
        rawMetadata: {
          attributes: [
            { trait_type: 'name', value: 'epic-rabbits' },
            { trait_type: 'color', value: 'red' },
            { trait_type: 'tier', value: 'free' },
            { trait_type: 'oboleBalance', value: 100, display_type: 'numeric' },
          ],
        },
        tokenUri: {
          gateway: `${baseUrl()}/api/tokens/0000000000000000000000000000000000000000000000000000000000000002.json`,
          raw: `${baseUrl()}/api/tokens/{id}.json`,
        },
        media: [],
        balance: 1,
      },
    ];
  }
  /*{
    contract: { address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' },
    tokenId: '2',
    tokenType: 'UNKNOWN',
    balance: 1
  }*/
  const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [process.env.NEXT_PUBLIC_TOKENS_CONTRACT_ADDRESS],
  });
  /* const { ownedNfts } = await alchemy.nft.getNftsForOwner(
    '0x6cfFC3A3c6E609C8488E02bB72ea0F706dD092A9',
    { contractAddresses: ['0xeb9bc6bcad612fd5caf1ca8406d746cc02e675d9'] },
  ); */
  return ownedNfts;
};

export default alchemy;
