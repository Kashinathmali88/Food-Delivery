import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/cart.controller.js";
import { userAuth } from "../middlewears/userAuth.middlewear.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.get("/get", userAuth, getCartItems);
cartRouter.post("/remove", userAuth, removeFromCart);

export default cartRouter;
