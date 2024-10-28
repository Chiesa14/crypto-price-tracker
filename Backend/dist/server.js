"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const priceController_1 = require("./controllers/priceController");
const socketHandler_1 = require("./handlers/socketHandler");
const dotenv_1 = require("./config/dotenv");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, socketHandler_1.socketHandler)(io);
node_cron_1.default.schedule("* * * * *", () => (0, priceController_1.updateLivePrices)(io));
server.listen(dotenv_1.PORT, () => {
    console.log(`Server listening on port ${dotenv_1.PORT}`);
});
