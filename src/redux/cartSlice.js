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
    updateItem: (state, action) => {
      /* const itemUpdate = action.payload;

      const items = state.value.filter(
        (e) =>
          e.size === itemUpdate.size &&
          e.option.color === itemUpdate.option.color
      );
      
      if (items.length > 0) {
        state.value = state.value = state.value.filter(
          (e) =>
            e.id !== itemUpdate.id ||
            e.amount !== itemUpdate.amount ||
            e.size !== itemUpdate.size ||
            e.option.color !== itemUpdate.option.color ||
            e.slug !== itemUpdate.slug
        );
        console.log(state.value);
        state.value = [
          ...state.value,
          {
            ...itemUpdate,
            id: items[0].id,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(state.value));
      } */
    },
    deleteItem: (state, action) => {
      const itemDelete = action.payload;
      state.value = state.value.filter(
        (e) =>
          e.id !== itemDelete.id ||
          e.amount !== itemDelete.amount ||
          e.size !== itemDelete.size ||
          e.option.color !== itemDelete.option.color ||
          e.slug !== itemDelete.slug
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});

/* const delItem = (arr, item) => {
  arr.filter(
    (e) =>
      e.id !== item.id ||
      e.amount !== item.amount ||
      e.size !== item.size ||
      e.option.color !== item.option.color ||
      e.slug !== item.slug
  );
}; */

export const { addToCart, deleteItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
