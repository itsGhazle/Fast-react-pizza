import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewItemToCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteItemFromCart(state, action) {
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    IncreaseItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItemFromCart;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addNewItemToCart,
  deleteItemFromCart,
  IncreaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getCart = (state) => state.cart.cart;
export const getTotalQuantity = function (state) {
  return state.cart.cart.reduce((acc, el) => acc + el.quantity, 0);
};
export const getTotalPrice = function (state) {
  return state.cart.cart.reduce((acc, el) => acc + el.totalPrice, 0);
};
export const getCurrentQuantity = function (id) {
  (state) => state.cart.cart.find((el) => el.pizzaId === id)?.quantity ?? 0;
};
