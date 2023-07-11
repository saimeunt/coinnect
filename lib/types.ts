export type RawMembership = {
  // creator: `0x${string}`;
  name: `0x${string}`;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  interests: bigint;
};

export type Membership = {
  // creator: `0x${string}`;
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  interests: number[];
};
