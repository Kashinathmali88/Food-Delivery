import fs from "fs";
import { prisma } from "../config/dbConntect.js";
import { validateFood } from "../config/validator.js";
import { imagekit } from "../config/imagekitConfig.js";

// add to cart
export const addFoodToMenu = async (req, res) => {
  try {
    validateFood(req.body);
    const image = req.file;
    const response = await imagekit.upload({
      file: fs.createReadStream(image.path),
      fileName: image.originalname,
      folder: "foods",
    });

    const data = {
      ...req.body,
      image: response.url,
      price: parseFloat(req.body.price),
    };

    const food = await prisma.Foods.create({
      data,
    });

    if (!food) throw new Error("faild to add food");
    return res
      .status(200)
      .json({ success: true, message: "product added", food });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// get all food
export const getAllFood = async (req, res) => {
  try {
    const foods = await prisma.Foods.findMany();
    return res.status(200).json({ success: true, foods });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get food by id
export const getFoodById = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "product added" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// delete food by id
export const deleteFoodById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("plz provide id to delete");

    const deletedFood = await prisma.Foods.delete({ where: { id: id } });

    return res
      .status(200)
      .json({ success: true, message: "product deleted", deletedFood });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update food by id
export const updateFoodById = async (req, res) => {
  try {
    validateFood(req.body);
    const { id } = req.body;
    if (!id) throw new Error("plz provide id to update");

    const updatedFood = await prisma.Foods.update({
      where: { id },
      data: req.body,
    });

    return res
      .status(200)
      .json({ success: true, message: "product updated", updatedFood });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
