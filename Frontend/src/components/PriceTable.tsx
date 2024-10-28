import React from "react";
import { PriceData } from "../types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PriceTableProps {
  prices: { [key: string]: PriceData };
}

const PriceTable: React.FC<PriceTableProps> = ({ prices }) => {
  return (
    <section className="flex-1 bg-[#1c181f] shadow-lg rounded-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Live Cryptocurrency Prices
      </h2>
      <Table>
        <TableCaption>Cryptocurrencies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold text-white">#</TableHead>
            <TableHead className="font-bold text-white">Coin Name</TableHead>
            <TableHead className="font-bold text-white">Price</TableHead>
            <TableHead className=" font-bold  sm:block md:hidden lg:block text-white">
              24 hr Change
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(prices).map(([index, data]) => (
            <TableRow
              key={index}
              className={`bg-[#1e1e1e]`}
            >
              <TableCell className=" text-white">
                {parseFloat(index) + 1}
              </TableCell>
              <TableCell className=" text-white">{data.name}</TableCell>
              <TableCell className=" text-green-600 font-semibold">
                $
                {data.current_price !== undefined
                  ? data.current_price.toFixed(2)
                  : "N/A"}
              </TableCell>
              <TableCell
                className={`sm:block md:hidden lg:block ${
                  data.price_change_24h >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }`}
              >
                {data.price_change_24h !== undefined
                  ? `${data.price_change_24h.toFixed(2)}`
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default PriceTable;
