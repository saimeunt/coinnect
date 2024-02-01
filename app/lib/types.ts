type ObjectValues<T> = T[keyof T];

export const cardTiers = {
  free: 'Free',
  standard: 'Standard',
  premium: 'Premium',
} as const;

export type CardTierName = keyof typeof cardTiers;

type CardTier = { logoUrl: string; color: number };

export type Cards = { [K in CardTierName]: CardTier };

export const SubscriptionDurations = {
  None: 0,
  Months1: 1,
  Months3: 2,
  Months6: 3,
  Months12: 4,
} as const;

export type SubscriptionDuration = ObjectValues<typeof SubscriptionDurations>;

export type SubscriptionDurationName = keyof typeof SubscriptionDurations;
