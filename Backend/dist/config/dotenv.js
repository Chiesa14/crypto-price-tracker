"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENCY = exports.CRYPTO_IDS = exports.COINGECKO_API_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || '5000';
exports.COINGECKO_API_URL = process.env.COINGECKO_API_URL || '';
exports.CRYPTO_IDS = process.env.CRYPTO_IDS || '';
exports.CURRENCY = process.env.CURRENCY || 'usd';
