import React from "react";
import { PriceData } from "../types";

interface CoinSelectorProps {
  selectedCoin: string;
  thresholdValue: string;
  handleCoinSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleThresholdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setThresholdsHandler: () => void;
  prices: { [key: string]: PriceData };
}

const CoinSelector: React.FC<CoinSelectorProps> = ({
  selectedCoin,
  thresholdValue,
  handleCoinSelect,
  handleThresholdChange,
  setThresholdsHandler,
  prices,
}) => {
  return (
    <section className="text-center w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Set Price Threshold
      </h2>
      <section className="flex md:flex-row flex-col gap-8 mb-10 w-full justify-center md:items-center">
        <select
          value={selectedCoin}
          onChange={handleCoinSelect}
          className="border rounded p-2"
        >
          <option value="">Select a coin</option>
          {Object.values(prices).map((data, index) => (
            <option key={index} value={data.name.toLowerCase()}>
              {data.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="threshold"
          placeholder="Threshold Price"
          value={thresholdValue}
          onChange={handleThresholdChange}
          className="border rounded p-2"
        />

        <button
          onClick={setThresholdsHandler}
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Set Threshold
        </button>
      </section>
    </section>
  );
};

export default CoinSelector;
