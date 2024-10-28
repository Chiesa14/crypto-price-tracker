export interface PriceData {
  name: string;
  current_price: number;
  price_change_24h: number;
}

export interface ThresholdAlertData {
  crypto: string;
  threshold: number;
  price: number;
  direction: "Above" | "Below";
}

export interface Notification {
  message: string;
  timestamp: number;
}
