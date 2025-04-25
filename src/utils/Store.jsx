import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import productSlice from "./ProductsSlice";
import cartSlice from "./CartSlice";
const Store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
Store.subscribe(() => {
  const state = Store.getState();
  const cartItems = state.cart.items;

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

export default Store;
