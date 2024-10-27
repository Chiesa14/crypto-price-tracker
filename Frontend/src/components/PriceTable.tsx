import React from "react";
import { PriceData } from "../types";

interface PriceTableProps {
  prices: { [key: string]: PriceData };
}

const PriceTable: React.FC<PriceTableProps> = ({ prices }) => {
  return (
    <section className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Live Cryptocurrency Prices
      </h2>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Coin Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">24 hr Change</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices).map(([index, data], i) => (
            <tr
              key={index}
              className={`transition-colors duration-300 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-200`}
            >
              <td className="p-3 text-gray-800">{index}</td>
              <td className="p-3 text-gray-800">{data.name}</td>
              <td className="p-3 text-green-600 font-semibold">
                $
                {data.current_price !== undefined
                  ? data.current_price.toFixed(2)
                  : "N/A"}
              </td>
              <td
                className={`p-3 ${
                  data.price_change_24h >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }`}
              >
                {data.price_change_24h !== undefined
                  ? `${data.price_change_24h.toFixed(2)}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PriceTable;
