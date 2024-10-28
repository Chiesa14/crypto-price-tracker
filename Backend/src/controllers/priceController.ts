// src/controllers/priceController.ts
import { fetchLivePrices } from "../services/coingeckoService";
import { checkThresholds } from "../services/thresholdService";
import { Server } from "socket.io";
import { LivePrices } from "../types";

let livePrices: LivePrices = [];

export const updateLivePrices = async (io: Server): Promise<void> => {
  try {
    livePrices = await fetchLivePrices();
    io.emit("priceUpdate", livePrices);
    checkThresholds(io, livePrices);
  } catch (error: any) {
    console.error("Error fetching prices from CoinGecko:", error.message);
  }
};

export const getPrices = (): LivePrices => livePrices;
