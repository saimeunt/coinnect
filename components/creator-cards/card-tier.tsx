'use client';
import { useState } from 'react';
import { addYears } from 'date-fns';

import { CreatorAccount, CardTierName } from '../../lib/types';
import { colors } from '../../lib/constants';
import CardForm from './card-form';
import CardPreview from './card-preview';

const CardTier = ({
  tier,
  user,
}: {
  tier: CardTierName;
  user: { fullName: string; profileImageUrl: string; creatorAccount: CreatorAccount };
}) => {
  const cardTier = user.creatorAccount.cards[tier];
  const [logoUrl, setLogoUrl] = useState(cardTier.logoUrl);
  // const [dataUrl, setDataUrl] = useState('');
  const [color, setColor] = useState(cardTier.color);
  const { name: colorString } = colors.find(({ id }) => id === color) as {
    id: number;
    name: string;
  };
  /* const getPreviewLink = () => {
    const url = new URL('/api/card-preview', 'http://localhost:3000');
    url.searchParams.append('color', colorString.toLowerCase());
    if (logoUrl.startsWith('/')) {
      url.searchParams.append('logoUrl', `http://localhost:3000${logoUrl}`);
    } else if (logoUrl.startsWith('blob:')) {
      url.searchParams.append('logoUrl', dataUrl);
    } else {
      url.searchParams.append('logoUrl', logoUrl);
    }
    url.searchParams.append('tier', tier);
    // url.searchParams.append('memberId', '1');
    // url.searchParams.append('subscriptionStartTimestamp', '0');
    // url.searchParams.append('subscriptionEndTimestamp', '0');
    url.searchParams.append('username', user.fullName);
    url.searchParams.append('avatarUrl', user.profileImageUrl);
    // url.searchParams.append('oboleBalance', '0');
    url.searchParams.append('title', user.creatorAccount.title);
    url.searchParams.append('description', user.creatorAccount.description);
    url.searchParams.append('name', user.creatorAccount.name);
    return url.toString();
  }; */
  return (
    <>
      <CardForm
        tier="free"
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        // setDataUrl={setDataUrl}
        color={color}
        setColor={setColor}
        // previewLink={getPreviewLink()}
      />
      <CardPreview
        color={colorString.toLowerCase()}
        logoUrl={logoUrl}
        tier={tier}
        memberId="1"
        subscriptionStartTimestamp={Math.floor(Date.now() / 1000)}
        subscriptionEndTimestamp={
          tier === 'free' ? 0 : Math.floor(addYears(new Date(), 1).getTime() / 1000)
        }
        username={user.fullName}
        avatarUrl={user.profileImageUrl}
        oboleBalance="0"
        title={user.creatorAccount.title}
        description={user.creatorAccount.description}
        name={user.creatorAccount.name}
      />
    </>
  );
};

export default CardTier;
