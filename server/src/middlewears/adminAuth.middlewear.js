import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      throw new Error("token is missing");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      throw new Error("You are not authorized");
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: true, message: error.message });
  }
};
