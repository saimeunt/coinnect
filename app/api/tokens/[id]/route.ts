import { NextRequest, NextResponse } from 'next/server';

import { formatObol } from '@/app/lib/utils';
import { membershipCardData } from '@/app/lib/contracts/coinnect/contract';

export const GET = async (request: NextRequest) => {
  const [, , , jsonTokenId] = request.nextUrl.pathname.split('/');
  const [tokenIdString] = jsonTokenId!.split('.');
  const tokenId = BigInt(tokenIdString!);
  const membershipCardUrl = new URL(
    `/api/membership-cards/${tokenId.toString().padStart(64, '0')}`,
    process.env.NEXT_PUBLIC_BASE_URL,
  );
  const membershipCard = await membershipCardData(tokenId);
  if (!membershipCard) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  if (membershipCard.memberId === 0n) {
    return NextResponse.json({
      image: new URL('/img/obol.jpg', process.env.NEXT_PUBLIC_BASE_URL).href,
      external_url: new URL(`/creators/${membershipCard.slug}`, process.env.NEXT_PUBLIC_BASE_URL)
        .href,
      description: membershipCard.description,
      name: `${membershipCard.title} Obol`,
    });
  }
  const attributes = [
    { trait_type: 'slug', value: membershipCard.slug },
    { trait_type: 'color', value: membershipCard.color },
    { trait_type: 'tier', value: membershipCard.tier },
    { trait_type: 'memberId', value: membershipCard.memberId.toString() },
    {
      trait_type: 'mintTimestamp',
      value: Number(membershipCard.mintTimestamp),
      display_type: 'date',
    },
    { trait_type: 'username', value: membershipCard.username },
    {
      trait_type: 'obolBalance',
      value: formatObol(membershipCard.obolBalance),
      display_type: 'numeric',
    },
  ];
  if (membershipCard.subscriptionEndTimestamp !== 0n) {
    attributes.push({
      trait_type: 'subscriptionEndTimestamp',
      value: Number(membershipCard.subscriptionEndTimestamp),
      display_type: 'date',
    });
  }
  return NextResponse.json({
    // image_data: svgImageData,
    // external_url: membershipCardUrl.href,
    image: membershipCardUrl.href,
    external_url: new URL(`/creators/${membershipCard.slug}`, process.env.NEXT_PUBLIC_BASE_URL)
      .href,
    description: membershipCard.description,
    name: `${membershipCard.title} Membership Card #${membershipCard.memberId}`,
    attributes,
    background_color: 'F8FAFC',
  });
};
