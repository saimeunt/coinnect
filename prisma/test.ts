// import { create, Account } from '@web3-storage/w3up-client';
/* import { filesFromPaths } from 'files-from-path';
import { NFTStorage, File } from 'nft.storage';
const client = new NFTStorage({
  token
}); */

const main = async () => {
  /* const file = Bun.file('public/img/creators/epic-rabbits/avatar.jpg');
  const stream = file.stream();
  // const [file] = await filesFromPaths(['public/img/creators/epic-rabbits/avatar.jpg']);
  // const stream = await file.stream();
  const arrayBuffer = new Uint8Array(await new Response(stream).arrayBuffer());
  const cid = await client.storeBlob(new Blob([arrayBuffer]));
  console.log(cid); */
};

/* const main = async () => {
  const client = await create();
  // console.log(client);
  console.log('client');
  const space = await client.createSpace('coinnect');
  // console.log(space);
  console.log('space');
  const myAccount = await client.login('simon.arvaux@gmail.com');
  // console.log(myAccount);
  console.log('myAccount');
  while (true) {
    const res = await myAccount.plan.get();
    if (res.ok) break;
    console.log('Waiting for payment plan to be selected...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log(space.did());
  await myAccount.provision(space.did());
  await space.createRecovery(myAccount.did());
  await space.save();
  console.log('ABC');
  // const myAccount = await client.login('simon.arvaux@gmail.com');
  console.log(myAccount);
  await client.setCurrentSpace(space.did());
  const [file] = await filesFromPaths(['public/img/creators/epic-rabbits/avatar.jpg']);
  console.log(file);
  const fileCid = await client.uploadFile(file);
  console.log(fileCid);
  // const cid = 'bafkreigd445nqmclwmk7zftnrrsxoooxxhfdct4z5ovzr7nuawgtmsqmkq';
  // console.log(`https://${cid}.ipfs.w3s.link`);
}; */

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
