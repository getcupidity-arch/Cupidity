import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number.parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cookieDomain: process.env.COOKIE_DOMAIN || '',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_CLIENT_ID'] as const;

export function validateEnv(): void {
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
