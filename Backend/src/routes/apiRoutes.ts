// src/routes/apiRoutes.ts
import express from "express";
import { getPrices } from "../controllers/priceController";

const router = express.Router();

const handleLivePricesResponse = (res: express.Response, livePrices: any) => {
  if (Object.keys(livePrices).length === 0) {
    res.status(503).json({
      message: "Live prices not available yet. Try again shortly.",
    });
  } else {
    res.json(livePrices);
  }
};

router.get("/prices", (req: express.Request, res: express.Response) => {
  const livePrices = getPrices();
  handleLivePricesResponse(res, livePrices);
});

export default router;
