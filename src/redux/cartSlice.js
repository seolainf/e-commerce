import { createSlice } from "@reduxjs/toolkit";

const cart =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const initialState = { value: cart };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    deleteItem: (state, action) => {
      const itemDelete = action.payload;
      state.value = state.value.filter(
        (e) =>
          e.id !== itemDelete.id ||
          e.amount !== itemDelete.amount ||
          e.size !== itemDelete.size ||
          e.option.color !== itemDelete.option.color
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});

export const { addToCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
