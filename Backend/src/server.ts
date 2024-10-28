import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cron from "node-cron";
import { updateLivePrices } from "./controllers/priceController";
import { socketHandler } from "./handlers/socketHandler";
import { PORT } from "./config/dotenv";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);
cron.schedule("* * * * *", () => updateLivePrices(io));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
