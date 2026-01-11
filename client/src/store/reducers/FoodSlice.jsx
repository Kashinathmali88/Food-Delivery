import axiosClient from "../../config/axiosClient";
import { menu_list } from "../../assets/frontend_assets/assets";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFoodList = createAsyncThunk(
  "foods/getFoodList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/food/get");
      return response.data.foods;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  foods: [],
  filter: "",
  error: null,
  loading: false,
  menu: menu_list,
  filteredFoods: [],
};

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    selectFilter: (state, action) => {
      if (action.payload === state.filter || action.payload === "Select all") {
        state.filter = "";
      } else {
        state.filter = action.payload;
      }
    },
    clearFilter: (state) => {
      state.filter = "";
    },
    setFilterFoods: (state, action) => {
      state.filteredFoods = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.foods = action.payload;
      })
      .addCase(getFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { selectFilter, setFilterFoods, clearFilter } = foodSlice.actions;

export default foodSlice.reducer;
