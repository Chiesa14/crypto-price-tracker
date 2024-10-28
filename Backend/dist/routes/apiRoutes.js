"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/apiRoutes.ts
const express_1 = __importDefault(require("express"));
const priceController_1 = require("../controllers/priceController");
const router = express_1.default.Router();
const handleLivePricesResponse = (res, livePrices) => {
    if (Object.keys(livePrices).length === 0) {
        res.status(503).json({
            message: "Live prices not available yet. Try again shortly.",
        });
    }
    else {
        res.json(livePrices);
    }
};
router.get("/prices", (req, res) => {
    const livePrices = (0, priceController_1.getPrices)();
    handleLivePricesResponse(res, livePrices);
});
exports.default = router;
