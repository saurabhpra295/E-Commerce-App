"use client";
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++; 
      } else {
        state.push({ ...action.payload, quantity: 1 }); 
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload); 
    },
    clearCart: (state) => {
      return []; 
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
