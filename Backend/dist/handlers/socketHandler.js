"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const thresholdService_1 = require("../services/thresholdService");
const priceController_1 = require("../controllers/priceController");
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`Connected to client: ${socket.id}`);
        const livePrices = (0, priceController_1.getPrices)();
        if (Object.keys(livePrices).length > 0) {
            socket.emit("priceUpdate", livePrices);
        }
        socket.on("setThreshold", ({ crypto, threshold }) => {
            (0, thresholdService_1.addThreshold)(socket.id, crypto, threshold);
            socket.emit("thresholdSet", { crypto, threshold });
        });
        socket.on("disconnect", () => {
            (0, thresholdService_1.removeUserThreshold)(socket.id);
            console.log(`Disconnected from client: ${socket.id}`);
        });
    });
};
exports.socketHandler = socketHandler;
