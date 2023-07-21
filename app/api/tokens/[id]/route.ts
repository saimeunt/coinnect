import { NextRequest, NextResponse } from 'next/server';
import { formatUnits } from 'viem';

import { baseUrl } from '../../../../lib/utils';
import { getMembershipCardData } from '../../../../lib/contracts/tokens/contract';
import { colors } from '../../../../lib/constants';

export const GET = async (request: NextRequest) => {
  const [, , , jsonTokenId] = request.nextUrl.pathname.split('/');
  const [tokenIdString] = jsonTokenId.split('.');
  const tokenId = BigInt(tokenIdString);
  const membershipCardUrl = new URL(
    `/api/membership-cards/${tokenId.toString().padStart(64, '0')}`,
    baseUrl(),
  );
  const [
    {
      color: colorNumber,
      tier,
      memberId,
      mintTimestamp,
      subscriptionEndTimestamp,
      username,
      oboleBalance,
      title,
      description,
      name,
    },
    // svgImageData,
  ] = await Promise.all([
    getMembershipCardData(tokenId),
    // fetch(membershipCardUrl.toString()).then((response) => response.text()),
  ]);
  const { name: color } = colors.find(({ id }) => id === colorNumber) as {
    id: number;
    name: string;
  };
  const attributes = [
    { trait_type: 'name', value: name },
    { trait_type: 'color', value: color },
    { trait_type: 'tier', value: tier },
    { trait_type: 'memberId', value: memberId.toString() },
    {
      trait_type: 'mintTimestamp',
      value: Number(mintTimestamp),
      display_type: 'date',
    },
    { trait_type: 'username', value: username },
    {
      trait_type: 'oboleBalance',
      value: Number(formatUnits(oboleBalance, 6)),
      display_type: 'numeric',
    },
  ];
  if (subscriptionEndTimestamp !== BigInt(0)) {
    attributes.push({
      trait_type: 'subscriptionEndTimestamp',
      value: Number(subscriptionEndTimestamp),
      display_type: 'date',
    });
  }
  return NextResponse.json({
    // image_data: svgImageData,
    // external_url: membershipCardUrl.href,
    image: membershipCardUrl.href,
    external_url: new URL(`/creators/${name}`, baseUrl()).href,
    description,
    name: `${title} Membership Card #${memberId}`,
    attributes,
    background_color: 'F8FAFC',
  });
};
