import React from "react";
import { PriceData } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CoinSelectorProps {
  selectedCoin: string;
  thresholdValue: string;
  handleCoinSelect: (value: string) => void;
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
        <Select value={selectedCoin} onValueChange={handleCoinSelect}>
          <SelectTrigger className="lg:w-[300px] w-full">
            <SelectValue placeholder="Select coin" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(prices).map((data, index) => (
              <SelectItem key={index} value={data.name.toLowerCase()}>
                {data.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          name="threshold"
          placeholder="Threshold Price"
          value={thresholdValue}
          onChange={handleThresholdChange}
          className="lg:w-[500px] w-full"
        />
        <Button
          onClick={setThresholdsHandler}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500"
        >
          Set Threshold
        </Button>
      </section>
    </section>
  );
};

export default CoinSelector;
