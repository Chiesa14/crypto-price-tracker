"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrices = exports.updateLivePrices = void 0;
// src/controllers/priceController.ts
const coingeckoService_1 = require("../services/coingeckoService");
const thresholdService_1 = require("../services/thresholdService");
let livePrices = [];
const updateLivePrices = (io) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        livePrices = yield (0, coingeckoService_1.fetchLivePrices)();
        io.emit("priceUpdate", livePrices);
        (0, thresholdService_1.checkThresholds)(io, livePrices);
    }
    catch (error) {
        console.error("Error fetching prices from CoinGecko:", error.message);
    }
});
exports.updateLivePrices = updateLivePrices;
const getPrices = () => livePrices;
exports.getPrices = getPrices;
