import axios from 'axios';
import { COINGECKO_API_URL, CRYPTO_IDS, CURRENCY } from '../config/dotenv';
import { LivePrices } from '../types';

export const fetchLivePrices = async (): Promise<LivePrices> => {
  const response = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: CRYPTO_IDS,
      vs_currency: CURRENCY,
    },
  });
  return response.data;
};
