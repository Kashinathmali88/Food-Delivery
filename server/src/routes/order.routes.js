import express from "express";
import {
  getAllOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controller/order.controller.js";
import { adminAuth } from "../middlewears/adminAuth.middlewear.js";
import { userAuth } from "../middlewears/userAuth.middlewear.js";

const orderRoutes = express.Router();

orderRoutes.post("/cod", userAuth, placeOrder);
orderRoutes.get("/get", adminAuth, getAllOrders);
orderRoutes.get("/user-orders", userAuth, userOrders);
orderRoutes.put("/update-status", adminAuth, updateStatus);

export default orderRoutes;
