import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Bounce, toast } from "react-toastify";
import { Notification, ThresholdAlertData } from "../types";

const socket = io("http://localhost:5000");

export const useSocket = () => {
  const [notification, setNotification] = useState<Notification[]>([]);
  const [prices, setPrices] = useState({});
  const [selectedCoin, setSelectedCoin] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");
  const [thresholds, setThresholds] = useState({});

  const notifyThresholdCross = (data: ThresholdAlertData) => {
    const { crypto, price, direction, threshold } = data;
    const message = `${
      crypto.charAt(0).toUpperCase() + crypto.slice(1)
    } is now ${direction} the threshold of $${threshold}. Current price: $${price}`;
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

  useEffect(() => {
    socket.on("riseThresholdAlert", (message) => {
      notifyThresholdCross(message);
    });
    socket.on("fallThresholdAlert", (message) => {
      notifyThresholdCross(message);
    });

    socket.on("priceUpdate", (data) => {
      setPrices(data);
    });

    return () => {
      socket.off("riseThresholdAlert");
      socket.off("fallThresholdAlert");
      socket.off("priceUpdate");
    };
  }, []);

  const handleCoinSelect = (value: string) => {
    setSelectedCoin(value);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThresholdValue(e.target.value);
  };

  const setThresholdsHandler = () => {
    if (!selectedCoin) {
      toast.error("Please select a coin", { transition: Bounce });
      return;
    }
    if (thresholdValue) {
      setThresholds((prev) => ({
        ...prev,
        [selectedCoin]: parseFloat(thresholdValue),
      }));
      setThresholdValue("");
      toast.success(
        `Threshold set for ${selectedCoin} at $${thresholdValue} successfully`,
        { transition: Bounce }
      );

      socket.emit("setThreshold", {
        crypto: selectedCoin,
        threshold: parseFloat(thresholdValue),
      });
    }
  };

  return {
    notification,
    prices,
    selectedCoin,
    thresholdValue,
    thresholds,
    handleCoinSelect,
    handleThresholdChange,
    setThresholdsHandler,
  };
};
