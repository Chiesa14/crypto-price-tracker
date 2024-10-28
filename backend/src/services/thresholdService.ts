// src/services/thresholdService.ts
import { Server } from 'socket.io';
import { Price } from '../types';

type Thresholds = Record<string, Record<string, number>>;

const userThresholds: Thresholds = {};

// Add a new threshold for a user
export const addThreshold = (socketId: string, cryptoId: string, threshold: number) => {
  if (!userThresholds[socketId]) {
    userThresholds[socketId] = {};
  }
  userThresholds[socketId][cryptoId] = threshold;
};

// Check and emit alerts based on current prices vs thresholds
export const checkThresholds = (io: Server, livePrices: Price[]) => {
  const priceMap = livePrices.reduce((acc, crypto) => {
    acc[crypto.id] = crypto.current_price;
    return acc;
  }, {} as Record<string, number>);

  for (const [socketId, thresholds] of Object.entries(userThresholds)) {
    for (const [cryptoId, threshold] of Object.entries(thresholds)) {
      const currentPrice = priceMap[cryptoId];
      if (currentPrice !== undefined) {
        const direction = currentPrice > threshold ? 'above' : 'below';
        io.to(socketId).emit(direction === 'above' ? 'riseThresholdAlert' : 'fallThresholdAlert', {
          crypto: cryptoId,
          price: currentPrice,
          threshold,
          direction,
        });
      }
    }
  }
};

// Remove thresholds for a user
export const removeUserThreshold = (socketId: string) => {
  delete userThresholds[socketId];
};
