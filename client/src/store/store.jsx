import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/reducers/CartSlice";
import orderReducer from "../store/reducers/OrderSlice";
import authReducer from "../store/reducers/UserAuthSlice";
import foodReducer from "../store/reducers/FoodSlice";

export const store = configureStore({
  reducer: {
    foods: foodReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
  },
});
