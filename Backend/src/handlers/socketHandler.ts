import { Server, Socket } from "socket.io";
import {
  addThreshold,
  removeUserThreshold,
} from "../services/thresholdService";
import { getPrices } from "../controllers/priceController";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Connected to client: ${socket.id}`);

    const livePrices = getPrices();
    if (Object.keys(livePrices).length > 0) {
      socket.emit("priceUpdate", livePrices);
    } else {
      socket.emit("priceUpdateFailed");
    }

    socket.on("setThreshold", ({ crypto, threshold }) => {
      addThreshold(socket.id, crypto, threshold);
      socket.emit("thresholdSet", { crypto, threshold });
    });

    socket.on("disconnect", () => {
      removeUserThreshold(socket.id);
      console.log(`Disconnected from client: ${socket.id}`);
    });
  });
};
