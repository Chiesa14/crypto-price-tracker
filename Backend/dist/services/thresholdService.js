"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserThreshold = exports.checkThresholds = exports.addThreshold = void 0;
const userThresholds = {};
// Add a new threshold for a user
const addThreshold = (socketId, cryptoId, threshold) => {
    if (!userThresholds[socketId]) {
        userThresholds[socketId] = {};
    }
    userThresholds[socketId][cryptoId] = threshold;
};
exports.addThreshold = addThreshold;
// Check and emit alerts based on current prices vs thresholds
const checkThresholds = (io, livePrices) => {
    const priceMap = livePrices.reduce((acc, crypto) => {
        acc[crypto.id] = crypto.current_price;
        return acc;
    }, {});
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
exports.checkThresholds = checkThresholds;
// Remove thresholds for a user
const removeUserThreshold = (socketId) => {
    delete userThresholds[socketId];
};
exports.removeUserThreshold = removeUserThreshold;
