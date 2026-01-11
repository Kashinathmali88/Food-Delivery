import { prisma } from "../config/dbConntect.js";
import { validateOrder } from "../config/validator.js";

// create cod
export const placeOrder = async (req, res) => {
  try {
    validateOrder(req.body);
    const { items, amount, address } = req.body;
    const orderData = { items, amount, address, userId: req.userId };

    const [order] = await prisma.$transaction([
      prisma.Order.create({
        data: orderData,
      }),
      prisma.User.update({
        where: { id: req.userId },
        data: { cartItem: {} },
      }),
    ]);

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "faild to create order" });
    }

    return res
      .status(200)
      .json({ success: true, message: "order created successfully", order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user orders
export const userOrders = async (req, res) => {
  try {
    const orders = await prisma.Order.findMany({
      where: { userId: req.userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "no orders found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "orders fetched", orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get all orders admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.Order.findMany();
    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "no orders found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "orders fetched", orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update status
export const updateStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    if (!status || !orderId) {
      return req.status(400).json({
        success: false,
        message: "plz provide the new status and orderid",
      });
    }

    const order = await prisma.Order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "no order found with this id" });
    }

    const updatedOrder = await prisma.Order.update({
      where: { id: orderId },
      data: { status: status },
    });
    if (!updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "failed to update status" });
    }
    return res
      .status(200)
      .json({ success: true, message: "status updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
