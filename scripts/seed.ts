import { ethers } from 'hardhat';
// import { time } from '@nomicfoundation/hardhat-network-helpers';

// import { defaultPosts } from '../app/lib/models/post';
/* import {
  rawCreatorAccountToCreatorAccount,
  rawUserAccountToUserAccount,
} from '../app/lib/contracts/accounts/utils'; */
import { type StableCoin, type Coinnect } from '../typechain-types';

const mainCreatorAccount = () => ({
  id: ethers.encodeBytes32String('1') as `0x${string}`,
  slug: ethers.encodeBytes32String('epic-rabbits') as `0x${string}`,
  title: 'Epic Rabbits',
  description:
    'Epic Rabbits is a community of generative artificial intelligence enthusiasts. We have free tutorials on Midjourney and private lives where we embark on an adventure to discover and learn Stable Diffusion.',
  avatarUrl: new URL('/img/creators/epic-rabbits/avatar.jpg', process.env.NEXT_PUBLIC_BASE_URL)
    .href,
  bannerUrl: new URL('/img/creators/epic-rabbits/banner.jpg', process.env.NEXT_PUBLIC_BASE_URL)
    .href,
  interests: [0],
  cards: {
    free: {
      logoUrl: new URL('/img/creators/epic-rabbits/free.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 0,
    },
    standard: {
      logoUrl: new URL('/img/creators/epic-rabbits/standard.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 5,
    },
    premium: {
      logoUrl: new URL('/img/creators/epic-rabbits/premium.jpg', process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      color: 10,
    },
  },
  obolId: 1n,
});

const simpleCreatorAccount = ({
  id,
  slug,
  title,
  description,
  obolId,
}: {
  id: string;
  slug: string;
  title: string;
  description: string;
  obolId: number;
}) => ({
  id: ethers.encodeBytes32String(id) as `0x${string}`,
  slug: ethers.encodeBytes32String(slug) as `0x${string}`,
  title,
  description,
  avatarUrl: new URL(`/img/creators/${slug}/avatar.jpg`, process.env.NEXT_PUBLIC_BASE_URL).href,
  bannerUrl: new URL(`/img/creators/${slug}/banner.jpg`, process.env.NEXT_PUBLIC_BASE_URL).href,
  interests: [0],
  cards: {
    free: {
      logoUrl: new URL(`/img/creators/${slug}/avatar.jpg`, process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 0,
    },
    standard: {
      logoUrl: new URL(`/img/creators/${slug}/avatar.jpg`, process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 5,
    },
    premium: {
      logoUrl: new URL(`/img/creators/${slug}/avatar.jpg`, process.env.NEXT_PUBLIC_BASE_URL).href,
      color: 10,
    },
  },
  obolId: BigInt(obolId),
});

const simpleCreators = [
  {
    id: '2',
    slug: 'tribe-diamonds',
    title: 'Tribe Diamonds',
    description:
      'The Tribe Diamond Pass is a collection of 200 generative NFTs that represents a community bonded by the belief in the future of web3 entertainment brands and interactive gaming. Holders can access a private community of gamers, crypto game developers and NFT collectors.',
  },
  {
    id: '3',
    slug: 'jrny-club-official',
    title: 'JRNY Club',
    description:
      'JRNY Club is a membership NFT that grants access to future sets, private community access, exclusive NFT videos, early access to partner NFT projects and more.',
  },
  {
    id: '4',
    slug: 'frequencypass',
    title: 'FREQUENCY PASS ®',
    description:
      'The FREQUENCY PASS ® is your first 🔑 to enter the AVØLVE ecosystem and become part of our curated community.',
  },
  {
    id: '5',
    slug: 'bens-trial-of-eyes',
    title: 'BENS Finale Trial of the Eyes',
    description:
      'Your time is running out, trials of tribulation are FINALE here. A last chance, a last opportunity. Have you been paying attention?',
  },
  {
    id: '6',
    slug: 'grumbies-eternal-entry',
    title: 'Grumbies Eternal Entry',
    description:
      'The Grumbies Eternal Entry is an access pass to the Grumbies ecosystem that gives you discounts and preferred access to games and experiences to win Ethereum.',
  },
  {
    id: '7',
    slug: 'applied-primate-keycard',
    title: 'Applied Primate Keycard',
    description:
      'This Maximum Security Keycard gives its holder access to all assignments at AppliedPrimate and is also used to track progress and record successful completion of key missions.',
  },
  {
    id: '8',
    slug: 'gorilla-mansion',
    title: 'Gorilla Mansion Origin',
    description:
      'Do you find yourself itching & scratching a lot? You might have Gorillaitus. You may need to sweep a bunch of Gorillas to shake this feeling!',
  },
  {
    id: '9',
    slug: 'metarides-pit-pass',
    title: 'MetaRides Pit Pass Memberships',
    description: 'MetaRides.io Pit Pass Memberships!',
  },
];

const seed = async (stableCoin: StableCoin, coinnect: Coinnect) => {
  // get signers
  const [signer1, signer2, signer3, signer4, signer5, signer6, signer7, signer8, signer9] =
    await ethers.getSigners();
  // mint StableCoin to users
  const stableCoinAmount = '10000';
  const stableCoinAmountInUnits = ethers.parseUnits('10000', 6);
  const creatorAddress = signer1!.address;
  let tx = await stableCoin.mint(signer1!.address, stableCoinAmountInUnits);
  await tx.wait();
  console.log(`Minted ${stableCoinAmount} USDC to ${creatorAddress}`);
  const userAddresses = [
    process.env.NODE_ENV !== 'production' ? signer2!.address : process.env.USER1_ADDRESS,
    process.env.NODE_ENV !== 'production' ? signer3!.address : process.env.USER2_ADDRESS,
    process.env.NODE_ENV !== 'production' ? signer4!.address : process.env.USER3_ADDRESS,
    process.env.NODE_ENV !== 'production' ? signer5!.address : process.env.USER4_ADDRESS,
    process.env.NODE_ENV !== 'production' ? signer6!.address : process.env.USER5_ADDRESS,
  ];
  for (const userAddress of userAddresses) {
    tx = await stableCoin.mint(userAddress, stableCoinAmountInUnits);
    await tx.wait();
    console.log(`Minted ${stableCoinAmount} USDC to ${userAddress}`);
  }
  // create main creator account
  const rawMainCreatorAccount = mainCreatorAccount();
  tx = await coinnect.createCreatorAccount(rawMainCreatorAccount);
  await tx.wait();
  console.log('Created main creator account');
  if (process.env.NODE_ENV !== 'production') {
    // create simple creator accounts
    const rawSimpleCreatorAccounts = simpleCreators.map((simpleCreator, index) =>
      simpleCreatorAccount({ ...simpleCreator, obolId: index + 2 }),
    );
    const signers = [signer2, signer3, signer4, signer5, signer6, signer7, signer8, signer9];
    let signerIndex = 0;
    for (const rawSimpleCreatorAccount of rawSimpleCreatorAccounts) {
      tx = await coinnect
        .connect(signers[signerIndex])
        .createCreatorAccount(rawSimpleCreatorAccount);
      await tx.wait();
      signerIndex++;
    }
    console.log('Created simple creator accounts');
    const userAccount = {
      id: ethers.encodeBytes32String('1') as `0x${string}`,
      username: ethers.encodeBytes32String('username') as `0x${string}`,
      avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      interests: [0],
    };
    tx = await coinnect.createUserAccount(userAccount);
    await tx.wait();
    tx = await coinnect.mintMembershipCard(rawMainCreatorAccount.id, userAccount);
    await tx.wait();
    // create user account
    /* const rawUserAccount = {
      id: ethers.encodeBytes32String('1') as `0x${string}`,
      username: ethers.encodeBytes32String('username') as `0x${string}`,
      avatarUrl: new URL('/img/users/avatar10.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      interests: [0],
    };
    tx = await coinnect.connect(signer2).createUserAccount(rawUserAccount);
    await tx.wait();
    console.log('Created user account');
    tx = await coinnect.connect(signer2).mintMembershipCard(rawMainCreatorAccount.id);
    await tx.wait(); */
    /* tx = await stableCoin.connect(signer2).approve(tokens.target, ethers.parseUnits('25', 6));
    await tx.wait();
    tx = await tokens.connect(signer2).donate(name, ethers.parseUnits('10', 6));
    await tx.wait();
    const userBalance1 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance1 = await tokens.balanceOf(signer2.address, rawMainCreatorAccount.oboleId);
    console.log({
      userBalance1: ethers.formatUnits(userBalance1, 6),
      oboleBalance1: ethers.formatUnits(oboleBalance1, 9),
    });
    const tier = ethers.encodeBytes32String('standard');
    tx = await tokens.connect(signer2).subscribe(name, tier, 1);
    await tx.wait();
    await time.increase(60 * 60 * 24);
    const rewardsAmount1 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount1: ethers.formatUnits(rewardsAmount1, 9) });
    tx = await tokens.connect(signer2).claimRewards(name);
    await tx.wait();
    const userBalance2 = await stableCoin.balanceOf(signer2.address);
    const oboleBalance2 = await tokens.balanceOf(signer2.address, rawMainCreatorAccount.oboleId);
    console.log({
      userBalance: ethers.formatUnits(userBalance2, 6),
      oboleBalance2: ethers.formatUnits(oboleBalance2, 9),
    });
    const rewardsAmount2 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount2: ethers.formatUnits(rewardsAmount2, 9) });
    await time.increase(60 * 60 * 24 * 60);
    const rewardsAmount3 = await tokens.rewardsAmount(signer2.address, name);
    console.log({ rewardsAmount3: ethers.formatUnits(rewardsAmount3, 9) });
    tx = await tokens.withdraw();
    await tx.wait();
    const creatorBalance = await stableCoin.balanceOf(signer1.address);
    console.log({ creatorBalance: ethers.formatUnits(creatorBalance, 6) }); */
  }
};

export default seed;
