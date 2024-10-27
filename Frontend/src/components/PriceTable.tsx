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
    <section className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Live Cryptocurrency Prices
      </h2>
      <Table>
        <TableCaption>Cryptocurrencies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">#</TableHead>
            <TableHead className="font-bold">Coin Name</TableHead>
            <TableHead className="font-bold">Price</TableHead>
            <TableHead className=" font-bold">24 hr Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(prices).map(([index, data], i) => (
            <TableRow
              key={index}
              className={`transition-colors duration-300 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-200`}
            >
              <TableCell className="p-3 text-gray-800">
                {parseFloat(index) + 1}
              </TableCell>
              <TableCell className="p-3 text-gray-800">{data.name}</TableCell>
              <TableCell className="p-3 text-green-600 font-semibold">
                $
                {data.current_price !== undefined
                  ? data.current_price.toFixed(2)
                  : "N/A"}
              </TableCell>
              <TableCell
                className={`p-3 ${
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
