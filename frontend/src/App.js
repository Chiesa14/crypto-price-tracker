import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

const socket = io('http://localhost:5000');

function App() {
  const [notification, setNotification] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('');
  const [thresholds, setThresholds] = useState({});
  const [thresholdValue, setThresholdValue] = useState('');

  useEffect(() => {
    socket.on('connect', () => console.log('Connected to server'));

    // Listen for threshold alerts from the server
    socket.on('riseThresholdAlert', (data) => {
      toast.success(`${data.crypto} has crossed the threshold of $${data.threshold}. Current price: $${data.price}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setNotification((prev) => [...prev, { message: `${data.crypto} has crossed the threshold of $${data.threshold}. Current price: $${data.price}` }]);
    });

    socket.on('fallThresholdAlert', (data) => {
      toast.success(`${data.crypto} has crossed the threshold of $${data.threshold}. Current price: $${data.price}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setNotification((prev) => [...prev, { message: `${data.crypto} has crossed the threshold of $${data.threshold}. Current price: $${data.price}` }]);
    });

    return () => {
      socket.off('fallThresholdAlert');
      socket.off('riseThresholdAlert');
    };
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prices');
        setPrices(response.data);
        checkThresholds(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkThresholds = (prices) => {
    Object.entries(prices).forEach(([key, data]) => {
      const threshold = thresholds[data.name.toLowerCase()];
      if (threshold) {
        const current_price = data.current_price;

        if (current_price < threshold) {
          notifyThresholdCross(data.name, current_price, 'below', threshold);
        } else if (current_price > threshold) {
          notifyThresholdCross(data.name, current_price, 'above', threshold);
        }
      }
    });
  };

  const notifyThresholdCross = (name, price, condition, threshold) => {
    const message = `${name} is ${condition} the threshold of $${threshold}. Current price: $${price}`;
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
    });
    setNotification((prev) => [...prev, { message }]);
  };

  const handleThresholdChange = (e) => {
    setThresholdValue(e.target.value);
  };

  const handleCoinSelect = (e) => {
    setSelectedCoin(e.target.value);
  };

  const setThresholdsHandler = () => {
    if (selectedCoin) {
      const threshold = Number(thresholdValue);
      setThresholds((prev) => ({
        ...prev,
        [selectedCoin]: threshold,
      }));
      // Emit the threshold to the backend
      socket.emit('setThreshold', {
        crypto: selectedCoin,
        threshold,
      });
      toast.success(`Threshold set for ${selectedCoin}: $${thresholdValue}`);
      setThresholdValue('');
    } else {
      toast.error('Please select a coin to set a threshold.');
    }
  };

  const renderThresholds = () => {
    return Object.entries(thresholds).length > 0 ? (
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
    ) : null;
  };

  return (
    <section className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Crypto Alerts & Live Prices</h1>
      <ToastContainer />

      {/* Threshold Selection */}
      <section className="text-center w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Set Price Threshold</h2>
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

      {/* Responsive Flex Container */}
      <section className="flex flex-col md:flex-row gap-8 w-full">

        {/* Price Box on the Left */}
        <section className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Live Cryptocurrency Prices</h2>
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
                <tr key={index} className={`transition-colors duration-300 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200`}>
                  <td className="p-3 text-gray-800">{index}</td>
                  <td className="p-3 text-gray-800">{data.name}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ${data.current_price !== undefined ? data.current_price.toFixed(2) : 'N/A'}
                  </td>
                  <td className={`p-3 ${data.price_change_24h >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}`}>
                    {data.price_change_24h !== undefined ? `${data.price_change_24h.toFixed(2)}` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Notification Box on the Right */}
        <section className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
          <div className="overflow-y-auto" style={{ maxHeight: '700px' }}>
            <ul className="space-y-3">
              {notification.map((notif, index) => (
                <li key={index} className="text-gray-800">{notif.message}</li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      {renderThresholds()}
    </section>
  );
}

export default App;
