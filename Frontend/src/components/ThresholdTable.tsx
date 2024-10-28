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
        <section className="w-full p-[1px] bg-border-1 rounded-2xl mt-10">
          <section className="flex-1 bg-[#1c181f] shadow-lg rounded-2xl p-6 overflow-x-auto w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Price Thresholds
          </h2>
          <Table>
            <TableCaption>Thresholds</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-bold text-white">#</TableHead>
                <TableHead className="font-bold text-white">Coin Name</TableHead>
                <TableHead className="font-bold text-white">Threshold Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(thresholds).map(([coin, threshold], i) => (
                <TableRow
                  key={coin}
                  className={` bg-[#1e1e1e]`}
                >
                  <TableCell className="text-white">{i + 1}</TableCell>
                  <TableCell className="text-white">
                    {coin.charAt(0).toUpperCase() + coin.slice(1)}
                  </TableCell>
                  <TableCell className=" text-white">
                    ${threshold.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        </section>
      ) : null}
    </>
  );
};

export default ThresholdTable;
