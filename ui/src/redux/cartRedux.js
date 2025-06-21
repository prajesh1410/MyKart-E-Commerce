import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existing = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }
      state.total += action.payload.price * action.payload.quantity;
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (product) {
        product.quantity += 1;
        state.total += Number(product.price);
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= Number(product.price);
      }
    },

    removeProduct: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (product) {
        state.products = state.products.filter(
          (item) => item._id !== product._id
        );
        state.quantity -= 1;
        state.total -= Number(product.price) * Number(product.quantity);
      }
    },

    // ✅ New clearCart reducer
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart, // ✅ Export clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
