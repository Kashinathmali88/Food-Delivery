import "dotenv/config";
import cors from "cors";
import express from "express";
import foodRouter from "./src/routes/food.routes.js";
import userRouter from "./src/routes/user.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : "",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/auth/", userRouter);
app.use("/api/v1/food/", foodRouter);
app.use("/api/v1/cart/", cartRouter);
app.use("/api/v1/order/", orderRoutes);

app.get("/", (req, res) => {
  res.send("Api is running successfully!!!!");
});
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
