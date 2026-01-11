import express from "express";
import {
  addFoodToMenu,
  deleteFoodById,
  getAllFood,
  getFoodById,
  updateFoodById,
} from "../controller/food.controller.js";
import { adminAuth } from "../middlewears/adminAuth.middlewear.js";
import { upload } from "../middlewears/multer.js";

const foodRouter = express.Router();

foodRouter.get("/get", getAllFood);
foodRouter.get("/get/:id", getFoodById);
foodRouter.put("/update", adminAuth, updateFoodById);
foodRouter.delete("/delete", adminAuth, deleteFoodById);
foodRouter.post("/add", adminAuth, upload.single("image"), addFoodToMenu);

export default foodRouter;
