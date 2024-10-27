import React from 'react';

interface ThresholdTableProps {
  thresholds: { [key: string]: number };
}

const ThresholdTable: React.FC<ThresholdTableProps> = ({ thresholds }) => {
  return (
    <>
      {Object.entries(thresholds).length > 0 ? (
        <section className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-x-auto w-full mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Thresholds</h2>
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3 text-left">Coin Name</th>
                <th className="p-3 text-left">Threshold Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(thresholds).map(([coin, threshold], i) => (
                <tr key={coin} className={`transition-colors duration-300 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200`}>
                  <td className="p-3 text-gray-800">{coin.charAt(0).toUpperCase() + coin.slice(1)}</td>
                  <td className="p-3 text-gray-800">${threshold.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </>
  );
};

export default ThresholdTable;
