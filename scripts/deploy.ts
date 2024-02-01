import { ethers } from 'hardhat';

import seed from './seed';

const main = async () => {
  const stableCoin = await ethers.deployContract('StableCoin');
  await stableCoin.waitForDeployment();
  console.log(`StableCoin successfully deployed to ${stableCoin.target}`);
  const coinnect = await ethers.deployContract('Coinnect', [
    new URL('/api/tokens/{id}.json', process.env.NEXT_PUBLIC_BASE_URL).href,
    stableCoin.target,
  ]);
  await coinnect.waitForDeployment();
  console.log(`Coinnect successfully deployed to ${coinnect.target}`);
  console.log('Deployment finished');
  await seed(stableCoin, coinnect);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
