import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/dbConntect.js";
import { validate } from "../config/validator.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register user
export const userRegister = async (req, res) => {
  try {
    validate(req.body);
    let { username, email, password } = req.body;

    if (!username) {
      username = email.split("@")[0];
    }

    const exitingUser = await prisma.User.findUnique({ where: { email } });

    if (exitingUser) throw new Error("user already exists");

    const hashPass = await bcrypt.hash(password, 10);

    const user = await prisma.User.create({
      data: {
        username,
        email,
        password: hashPass,
      },
    });

    if (!user) throw new Error("faild to register");

    const token = generateToken(user.id, user.role);

    return res.status(200).json({
      success: true,
      token,
      message: "user registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login user
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all field are required" });
    }
    const user = await prisma.User.findUnique({ where: { email } });

    if (!user) throw new Error("wrong email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("invalid password");

    const token = generateToken(user.id, user.role);

    return res.status(200).json({
      success: true,
      message: "user loggedIn",
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await prisma.User.findUnique({
      where: { id: req.userId },
      select: { username: true, email: true, role: true },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "plz login" });
    }

    return res.status(200).json({ success: true, message: "user info", user });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};
