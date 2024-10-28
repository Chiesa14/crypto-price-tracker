import { ToastContainer } from "react-toastify";
import { useSocket } from "./hooks/useSocket";
import CoinSelector from "./components/CoinSelector";
import NotificationList from "./components/NotificationList";
import PriceTable from "./components/PriceTable";
import ThresholdTable from "./components/ThresholdTable";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import './App.css'
import { Toaster } from "./components/ui/toaster";

function App() {
  const {
    notification,
    prices,
    selectedCoin,
    thresholdValue,
    thresholds,
    handleCoinSelect,
    handleThresholdChange,
    setThresholdsHandler,
  } = useSocket();

  return (
    <section className="p-8 bg-[#111111] min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">
        Crypto Alerts & Live Prices
      </h1>
      <ToastContainer />
      <Toaster />
      <CoinSelector
        selectedCoin={selectedCoin}
        thresholdValue={thresholdValue}
        handleCoinSelect={handleCoinSelect}
        handleThresholdChange={handleThresholdChange}
        setThresholdsHandler={setThresholdsHandler}
        prices={prices}
      />
      <section className="flex flex-col md:flex-row gap-8 w-full">
        <PriceTable prices={prices} />
        <NotificationList notifications={notification} />
      </section>
      <ThresholdTable thresholds={thresholds} />
    </section>
  );
}

export default App;
