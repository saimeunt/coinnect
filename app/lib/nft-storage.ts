import { NFTStorage } from 'nft.storage';

const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

export const gatewayUrl = (cid: string) => `https://nftstorage.link/ipfs/${cid}`;

export default nftStorage;
