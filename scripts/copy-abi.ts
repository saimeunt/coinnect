import { readFile, writeFile } from 'fs/promises';

const copyAbi = async (artifactFilePath: string, abiFilePath: string) => {
  const abiString = await readFile(artifactFilePath, 'utf8');
  const abiJson = JSON.parse(abiString);
  return writeFile(
    abiFilePath,
    `const abi =${JSON.stringify(abiJson.abi)}as const;\n\nexport default abi;`,
  );
};

const main = async () => {
  await Promise.all([
    copyAbi(
      'artifacts/contracts/StableCoin.sol/StableCoin.json',
      'app/lib/contracts/stablecoin/abi.ts',
    ),
    copyAbi('artifacts/contracts/Coinnect.sol/Coinnect.json', 'app/lib/contracts/coinnect/abi.ts'),
  ]);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
