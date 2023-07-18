// type ObjectValues<T> = T[keyof T];

type RawCardTier = { logoUrl: string; color: number };

type RawCards = { free: RawCardTier; standard: RawCardTier; premium: RawCardTier };

export type RawCreatorAccount = {
  name: `0x${string}`;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  interests: readonly number[];
  cards: RawCards;
  oboleId: bigint;
  userId: `0x${string}`;
};

type CardTier = { logoUrl: string; color: number };

type Cards = { free: CardTier; standard: CardTier; premium: CardTier };

export type CardTierName = keyof Cards;

export type CreatorAccount = {
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  interests: number[];
  cards: Cards;
  oboleId: number;
  userId: string;
};

export type RawMembershipCardData = {
  color: number;
  logoUrl: string;
  tier: `0x${string}`;
  memberId: bigint;
  subscriptionStartTimestamp: bigint;
  subscriptionEndTimestamp: bigint;
  username: `0x${string}`;
  avatarUrl: string;
  oboleBalance: bigint;
  title: string;
  description: string;
  name: `0x${string}`;
};

export type MembershipCardData = {
  color: number;
  logoUrl: string;
  tier: string;
  memberId: bigint;
  subscriptionStartTimestamp: bigint;
  subscriptionEndTimestamp: bigint;
  username: string;
  avatarUrl: string;
  oboleBalance: bigint;
  title: string;
  description: string;
  name: string;
};

export type RawUserAccount = {
  username: `0x${string}`;
  avatarUrl: string;
  interests: number[];
  userId: `0x${string}`;
};

export type UserAccount = {
  username: string;
  avatarUrl: string;
  interests: number[];
  userId: string;
};

export type UserPublicMetadata = {
  creatorAccount?: CreatorAccount;
  userAccount?: UserAccount;
};

export const postTiers = {
  public: 'Public',
  free: 'Free membership',
  standard: 'Standard membership',
  premium: 'Premium membership',
} as const;

export type PostTierName = keyof typeof postTiers;

export const postTierNames = Object.keys(postTiers) as PostTierName[];

export type Post = {
  videoUrl: string;
  title: string;
  description: string;
  tier: PostTierName;
  date: string;
};

export type UserPrivateMetadata = {
  posts?: Post[];
};
