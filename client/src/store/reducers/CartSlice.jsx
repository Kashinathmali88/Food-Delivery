import toast from "react-hot-toast";
import axiosClient from "../../config/axiosClient";
import { baseUrl } from "../../assets/frontend_assets/assets";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`${baseUrl}/api/v1/cart/add`, {
        productId,
        quantity,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`${baseUrl}/api/v1/cart/remove`, {
        productId,
        quantity,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${baseUrl}/api/v1/cart/get`);
      return response.data.cartItem.cartItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: {},
  subTotal: 0,
  error: null,
  loading: false,
  deliveryChagres: 5,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart cases
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { productId, quantity } = action.payload;
        if (!state.cart[productId]) {
          state.cart[productId] = { quantity: 0 };
        }
        state.cart[productId].quantity += quantity;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Remove from cart cases
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { productId, quantity } = action.payload;
        if (state.cart[productId].quantity === 0) {
          delete state.cart[productId];
          return;
        }
        state.cart[productId].quantity -= quantity;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Get user cart  cases
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSubTotal } = cartSlice.actions;

export default cartSlice.reducer;
