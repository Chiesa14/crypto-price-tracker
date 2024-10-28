import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Notification, ThresholdAlertData } from "../types";
import { useToast } from "./use-toast";

const socket = io("http://localhost:5000");

export const useSocket = () => {
  const { toast } = useToast();
  const [notification, setNotification] = useState<Notification[]>([]);
  const [prices, setPrices] = useState({});
  const [selectedCoin, setSelectedCoin] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");
  const [thresholds, setThresholds] = useState({});

  const notifyThresholdCross = (data: ThresholdAlertData) => {
    const { crypto, price, direction, threshold } = data;
    console.log(direction);

    const message = `${
      crypto.charAt(0).toUpperCase() + crypto.slice(1)
    } is now ${direction} the threshold of $${threshold}. Current price: $${price}`;

    toast({
      variant: direction === "below" ? "error" : "success",
      title: "Threshold Alert",
      description: message,
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

    socket.on("priceUpdateFailed", () => {
      toast({
        variant: "error",
        title: "Failed to fetch prices",
        description: "Refresh the app to try again",
      });
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
      toast({
        variant: "error",
        title: "Failed to set threshold",
        description: "Please select a coin first",
      });
      return;
    }
    if (thresholdValue) {
      setThresholds((prev) => ({
        ...prev,
        [selectedCoin]: parseFloat(thresholdValue),
      }));
      setThresholdValue("");
      toast({
        title: "Created Threshold",
        description: `Threshold set for ${selectedCoin} at $${thresholdValue} successfully`,
      });

      socket.emit("setThreshold", {
        crypto: selectedCoin,
        threshold: parseFloat(thresholdValue),
      });
    }
  };

  return {
    notification,
    setNotification,
    prices,
    selectedCoin,
    thresholdValue,
    thresholds,
    handleCoinSelect,
    handleThresholdChange,
    setThresholdsHandler,
  };
};
