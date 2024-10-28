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
      <h2 className="text-xl font-semibold text-white mb-4">
        Set price threshold
      </h2>
      <section className="flex md:flex-row flex-col gap-8 mb-10 w-full justify-center md:items-center">
        <Select value={selectedCoin} onValueChange={handleCoinSelect}>
          <SelectTrigger className="lg:w-[300px] w-full h-16 placeholder:text-white">
            <SelectValue placeholder="Select coin" className=" fill-white"/>
          </SelectTrigger>
          <SelectContent className="bg-[#2b2331] border-none">
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
          placeholder="Price"
          value={thresholdValue}
          onChange={handleThresholdChange}
          className="lg:w-[500px] w-full h-16 font-bold placeholder:text-xl placeholder:font-bold"
        />
        <Button
          onClick={setThresholdsHandler}
          className=" h-16 min-w-80 bg-blue-600 text-white rounded-xl px-4 py-2  bg-button-1 hover:bg-button-2"
        >
          <p className="font-bold text-xl">Set threshold</p>
        </Button>
      </section>
    </section>
  );
};

export default CoinSelector;
