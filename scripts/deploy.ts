import { ethers } from 'hardhat';
import { stringToHex } from 'viem';

async function main() {
  const contract = await ethers.deployContract('Memberships');
  await contract.waitForDeployment();
  await contract.createMembership({
    name: stringToHex('tribe-diamond', { size: 32 }),
    title: 'Tribe Diamond',
    description:
      'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming.',
    avatarUrl: '/img/avatar.jpg',
    bannerUrl: '/img/banner.jpg',
    interests: 0,
  });
  console.log(`Memberships successfully deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
