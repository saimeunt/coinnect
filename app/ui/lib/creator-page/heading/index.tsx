'use client';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { type UserAccount } from '@/app/lib/models/user-account';
import Banner from '@/app/ui/lib/creator-page/heading/banner';
import AvatarField from '@/app/ui/lib/creator-page/heading/avatar-field';
import LinkButton from '@/app/ui/lib/creator-page/heading/link-button';
import CreatorToolbar from '@/app/ui/lib/creator-page/heading/creator-toolbar';
import UserToolbar from '@/app/ui/lib/creator-page/heading/user-toolbar';
import GuestToolbar from '@/app/ui/lib/creator-page/heading/guest-toolbar';
import { type MembershipCardData } from '@/app/lib/contracts/coinnect/types';
import { formatObol } from '@/app/lib/utils';
import { Badge } from '@/components/badge';

const Heading = ({
  unpublished = false,
  creatorAccount,
  userAccount,
  role,
  membershipCard,
  userObolBalance,
  userRewardsAmount,
  bannerUrl = '',
  avatarUrl = '',
  setBannerUrl = () => {},
  setAvatarUrl = () => {},
}: {
  unpublished?: boolean;
  creatorAccount: CreatorAccount;
  userAccount?: UserAccount | null;
  role: 'creator' | 'user' | 'guest';
  membershipCard?: MembershipCardData | null;
  userObolBalance?: bigint;
  userRewardsAmount?: bigint;
  bannerUrl?: string;
  avatarUrl?: string;
  setBannerUrl?: (bannerUrl: string) => void;
  setAvatarUrl?: (avatarUrl: string) => void;
}) => (
  <>
    <Banner
      creatorAccount={creatorAccount}
      bannerUrl={bannerUrl}
      setBannerUrl={setBannerUrl}
      role={role}
    />
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <AvatarField
          creatorAccount={creatorAccount}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
          role={role}
        />
        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
            <div className="flex items-center">
              <h1 className="truncate text-2xl font-bold text-gray-900">{creatorAccount.title}</h1>
              {role === 'user' && !!userObolBalance && userObolBalance > 0n && (
                <Badge color="yellow" className="ml-4">
                  {formatObol(userObolBalance)} $OBOL
                </Badge>
              )}
            </div>
            <LinkButton slug={creatorAccount.slug} />
          </div>
          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            {role === 'creator' && <CreatorToolbar unpublished={unpublished} />}
            {role === 'user' && userAccount && (
              <UserToolbar
                creatorAccount={creatorAccount}
                userAccount={userAccount}
                membershipCard={membershipCard}
                userRewardsAmount={userRewardsAmount}
              />
            )}
            {role === 'guest' && <GuestToolbar slug={creatorAccount.slug} />}
          </div>
        </div>
      </div>
      <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
        <h1 className="truncate text-2xl font-bold text-gray-900">{creatorAccount.title}</h1>
        <LinkButton slug={creatorAccount.slug} />
      </div>
    </div>
  </>
);

export default Heading;
