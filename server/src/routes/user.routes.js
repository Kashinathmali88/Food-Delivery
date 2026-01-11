import express from "express";
import {
  getUserInfo,
  userLogin,
  userRegister,
} from "../controller/user.controller.js";
import { userAuth } from "../middlewears/userAuth.middlewear.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.get("/me", userAuth, getUserInfo);

export default userRouter;
