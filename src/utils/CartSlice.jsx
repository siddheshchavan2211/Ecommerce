import { createSlice } from "@reduxjs/toolkit";
const savedCart = JSON.parse(localStorage.getItem("cartItems"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart || [],
  },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        if (existing.quantity < 5) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < 5) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
