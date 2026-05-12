export const AUTH_COOKIE_NAME = 'cupidity_token';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? ('none' as const) : ('lax' as const),
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
};

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  authMax: 20,
};

export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
} as const;

export const RELATIONSHIP_STATUS = {
  SINGLE: 'single',
  IN_RELATIONSHIP: 'in_relationship',
  COMPLICATED: 'complicated',
  ENGAGED: 'engaged',
  MARRIED: 'married',
} as const;

export const COUPLE_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const ACTIVITY_TYPE = {
  DATE_PLANNED: 'date_planned',
  GIFT_SENT: 'gift_sent',
  MILESTONE: 'milestone',
  NOTE: 'note',
  MEMORY: 'memory',
} as const;

export const VISIBILITY = {
  PRIVATE: 'private',
  PARTNER: 'partner',
  PUBLIC: 'public',
} as const;
