import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '5000';
export const COINGECKO_API_URL = process.env.COINGECKO_API_URL || '';
export const CRYPTO_IDS = process.env.CRYPTO_IDS || '';
export const CURRENCY = process.env.CURRENCY || 'usd';
