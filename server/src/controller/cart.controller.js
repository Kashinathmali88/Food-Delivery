import { prisma } from "../config/dbConntect.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "invalid product ID or quantity" });
    }

    let isProductValid = await prisma.Foods.findUnique({
      where: { id: productId },
    });
    if (!isProductValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid product" });
    }

    let user = await prisma.User.findUnique({
      where: { id: req.userId },
      select: { cartItem: true },
    });

    const currentCart = user.cartItem || {};
    if (!currentCart[productId]) {
      currentCart[productId] = { quantity: 0 };
    }

    currentCart[productId].quantity += quantity;

    const updatedUser = await prisma.User.update({
      where: { id: req.userId },
      data: { cartItem: currentCart },
      select: { cartItem: true },
    });

    return res.status(200).json({
      success: true,
      message: "food add to cart",
      data: { productId, quantity },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "invalid product ID or quantity" });
    }

    let user = await prisma.User.findUnique({
      where: { id: req.userId },
      select: { cartItem: true },
    });

    const currentCart = user.cartItem || {};
    if (!currentCart[productId]) {
      return res.status(400).json({
        success: false,
        message: "item not found in cart",
      });
    }

    currentCart[productId].quantity -= quantity;
    if (currentCart[productId].quantity === 0) {
      delete currentCart[productId];
    }

    const updatedUser = await prisma.User.update({
      where: { id: req.userId },
      data: { cartItem: currentCart },
      select: { cartItem: true },
    });

    return res.status(200).json({
      success: true,
      message: "food removed from cart",
      data: { productId, quantity: quantity },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cartItem = await prisma.User.findUnique({
      where: { id: req.userId },
      select: { cartItem: true },
    });

    if (!cartItem) {
      return res
        .status(400)
        .json({ success: false, message: "cart items not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "cart items", cartItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
