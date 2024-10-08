import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/create-order", orderController.createOrder);

export const OrderRoutes = router;
