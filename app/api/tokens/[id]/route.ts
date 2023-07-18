import { NextRequest, NextResponse } from 'next/server';

import { baseUrl } from '../../../../lib/utils';
import { getMembershipCardData } from '../../../../lib/contracts/tokens/contract';

export const GET = async (request: NextRequest) => {
  const [, , , jsonTokenId] = request.nextUrl.pathname.split('/');
  const [tokenIdString] = jsonTokenId.split('.');
  const tokenId = BigInt(tokenIdString);
  // const scheme = `http${process.env.NODE_ENV !== 'production' ? '' : 's'}`;
  const membershipCardUrl = new URL(
    `/api/membership-cards/${tokenId.toString().padStart(64, '0')}`,
    baseUrl(), // `${scheme}://${process.env.VERCEL_URL}`,
  );
  const [
    {
      color,
      tier,
      memberId,
      subscriptionStartTimestamp,
      subscriptionEndTimestamp,
      username,
      oboleBalance,
      title,
      description,
    },
    svgImageData,
  ] = await Promise.all([
    getMembershipCardData(tokenId),
    fetch(membershipCardUrl.toString()).then((response) => response.text()),
  ]);
  return NextResponse.json({
    image_data: svgImageData,
    external_url: membershipCardUrl.toString(),
    description,
    name: `${title} Membership Card #${tokenId}`,
    attributes: [
      { trait_type: 'color', value: color },
      { trait_type: 'tier', value: tier },
      { trait_type: 'memberId', value: memberId, display_type: 'numeric' },
      {
        trait_type: 'subscriptionStartTimestamp',
        value: subscriptionStartTimestamp,
        display_type: 'date',
      },
      {
        trait_type: 'subscriptionEndTimestamp',
        value: subscriptionEndTimestamp,
        display_type: 'date',
      },
      { trait_type: 'username', value: username },
      { trait_type: 'oboleBalance', value: oboleBalance, display_type: 'numeric' },
    ],
    background_color: 'F8FAFC',
  });
};
