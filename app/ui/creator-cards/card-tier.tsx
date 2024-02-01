'use client';
import { useState } from 'react';
import { addYears } from 'date-fns';
import { useElementSize } from 'usehooks-ts';

import { type CardTierName } from '@/app/lib/types';
import { type UserAccount } from '@/app/lib/models/user-account';
import { type CreatorAccount } from '@/app/lib/models/creator-account';
import { colors } from '@/app/lib/constants';
import CardForm from '@/app/ui/creator-cards/card-form';
import CardPreview from '@/app/ui/creator-cards/card-preview';

const CardTier = ({
  tier,
  userAccount,
  creatorAccount,
}: {
  tier: CardTierName;
  userAccount: UserAccount;
  creatorAccount: CreatorAccount;
}) => {
  const cardTier = creatorAccount.cards[tier];
  const [logoUrl, setLogoUrl] = useState(cardTier.logoUrl);
  const [color, setColor] = useState(cardTier.color);
  const { name: colorString } = colors.find(({ id }) => id === color) as {
    id: number;
    name: string;
  };
  const [cardPreviewRef, cardPreviewSize] = useElementSize();
  return (
    <>
      <CardForm
        tier="free"
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        color={color}
        setColor={setColor}
      />
      <div ref={cardPreviewRef} className="max-w-[1024px]">
        <CardPreview
          transform={`scale(${cardPreviewSize.width / 1024})`}
          color={colorString.toLowerCase()}
          logoUrl={logoUrl}
          tier={tier}
          memberId="1"
          mintTimestamp={Math.floor(Date.now() / 1000)}
          subscriptionEndTimestamp={
            tier === 'free' ? 0 : Math.floor(addYears(new Date(), 1).getTime() / 1000)
          }
          username={userAccount.username}
          avatarUrl={userAccount.avatarUrl}
          obolBalance="0"
          title={creatorAccount.title}
          description={creatorAccount.description}
          slug={creatorAccount.slug}
        />
      </div>
    </>
  );
};

export default CardTier;
