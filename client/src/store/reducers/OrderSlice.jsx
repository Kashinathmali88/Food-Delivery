import toast from "react-hot-toast";
import axiosClient from "../../config/axiosClient";
import { baseUrl } from "../../assets/frontend_assets/assets";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const palceOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ items, amount, address }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/order/cod`, {
        items,
        amount,
        address,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/order/user-orders`);
      return response.data.orders;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  error: null,
  orders: [],
  loading: false,
  isSuccess: false,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      // Case for place order
      .addCase(palceOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(palceOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(palceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || "Somethig went wrogn";
      })
      // Case to get user orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || "Something went wrong";
      });
  },
});

export default OrderSlice.reducer;
