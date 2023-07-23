import { ethers } from 'hardhat';

import { baseUrl } from '../lib/utils';
import seed from './seed';

async function main() {
  const stableCoin = await ethers.deployContract('StableCoin');
  await stableCoin.waitForDeployment();
  console.log(`StableCoin successfully deployed to ${stableCoin.target}`);
  const accounts = await ethers.deployContract('Accounts');
  await accounts.waitForDeployment();
  console.log(`Accounts successfully deployed to ${accounts.target}`);
  const tokens = await ethers.deployContract('Tokens', [
    `${baseUrl()}/api/tokens/{id}.json`,
    stableCoin.target,
    accounts.target,
  ]);
  await tokens.waitForDeployment();
  console.log(`Tokens successfully deployed to ${tokens.target}`);
  const tx = await accounts.setTokens(tokens.target);
  await tx.wait();
  console.log('Deployment finished');
  await seed(stableCoin, accounts, tokens);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
