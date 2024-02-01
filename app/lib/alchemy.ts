import { Alchemy, Network, /*NftTokenType,*/ type OwnedBaseNft } from 'alchemy-sdk';

import { membershipCardData } from '@/app/lib/contracts/coinnect/contract';

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
});

export const getNftsForOwner = async (address: `0x${string}`) => {
  if (process.env.NODE_ENV !== 'production') {
    return [
      {
        contractAddress: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
        tokenId: '10',
        balance: '1',
        // contract: {
        // address: process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS,
        // tokenType: NftTokenType.ERC1155,
        // },
        // tokenId: '10',
        // tokenType: NftTokenType.UNKNOWN,
        // tokenType: NftTokenType.ERC1155,
        // title: 'Epic Rabbits Membership Card #1',
        // description: '',
        // timeLastUpdated: new Date().toISOString(),
        // image: {
        // cachedUrl: '',
        // },
        // raw: {
        // tokenUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tokens/{id}.json`,
        // },
        // metadataError: undefined,
        // rawMetadata: {
        //   attributes: [
        //     { trait_type: 'name', value: 'epic-rabbits' },
        //     { trait_type: 'color', value: 'red' },
        //     { trait_type: 'tier', value: 'free' },
        //     { trait_type: 'oboleBalance', value: 100, display_type: 'numeric' },
        //   ],
        // },
        // tokenUri: {
        //   gateway: `${baseUrl()}/api/tokens/0000000000000000000000000000000000000000000000000000000000000002.json`,
        //   raw: `${baseUrl()}/api/tokens/{id}.json`,
        // },
        // media: [],
        // balance: '1',
      },
    ] as OwnedBaseNft[];
  }
  const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [process.env.NEXT_PUBLIC_COINNECT_CONTRACT_ADDRESS],
    omitMetadata: true,
  });
  /* const { ownedNfts } = await alchemy.nft.getNftsForOwner(
    '0x6cfFC3A3c6E609C8488E02bB72ea0F706dD092A9',
    { contractAddresses: ['0xEBb37E46Fc0495e42eD43D5fc3FADFF49513ced8'], omitMetadata: true },
  ); */
  return ownedNfts;
};

export const getMembershipCards = async (address: `0x${string}`) => {
  const ownedNfts = await getNftsForOwner(address);
  const tokenIds = ownedNfts
    .filter(({ balance }) => BigInt(balance) === 1n)
    .map(({ tokenId }) => BigInt(tokenId));
  return Promise.all(tokenIds.map(membershipCardData));
};

export default alchemy;
