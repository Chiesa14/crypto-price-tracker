import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ThresholdTableProps {
  thresholds: { [key: string]: number };
}

const ThresholdTable: React.FC<ThresholdTableProps> = ({ thresholds }) => {
  return (
    <>
      {Object.entries(thresholds).length > 0 ? (
        <section className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-x-auto w-full mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Price Thresholds
          </h2>
          <Table>
            <TableCaption>Thresholds</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-bold">#</TableHead>
                <TableHead className="font-bold">Coin Name</TableHead>
                <TableHead className="font-bold">Threshold Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(thresholds).map(([coin, threshold], i) => (
                <TableRow
                  key={coin}
                  className={`transition-colors duration-300 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-200`}
                >
                  <TableCell className="p-3 text-gray-800">{i + 1}</TableCell>
                  <TableCell className="p-3 text-gray-800">
                    {coin.charAt(0).toUpperCase() + coin.slice(1)}
                  </TableCell>
                  <TableCell className="p-3 text-gray-800">
                    ${threshold.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : null}
    </>
  );
};

export default ThresholdTable;
