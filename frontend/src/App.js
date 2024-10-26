import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5000'); // Ensure the URL matches your backend
function App() {
  const [notification, setNotification] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Handle socket connection and push notifications
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('pushNotification', (data) => {
      console.log('Received notification:', data.message);

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setNotification((prev) => [...prev, data]);
    });

    return () => {
      socket.off('pushNotification');
    };
  }, []);

  useEffect(() => {
    // Function to fetch prices
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prices');
        setPrices(response.data);
        console.log('Fetched live prices:', response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    // Fetch prices every minute
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h1>Push Notifications & Live Prices</h1>
      <ToastContainer />

      {/* Display Notifications */}
      <ul>
        {notification.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>

      {/* Display Live Prices */}
      <h2>Live Cryptocurrency Prices</h2>
      <ul>
        {Object.entries(prices).map(([index, data]) => (
          <li key={index}>
            {data.name}: ${data.current_price}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
