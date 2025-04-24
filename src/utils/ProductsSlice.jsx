import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    AddProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const { AddProducts } = productSlice.actions;
export default productSlice.reducer;
