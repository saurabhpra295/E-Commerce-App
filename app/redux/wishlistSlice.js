"use client";
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.push(action.payload); 
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload); 
    },
    clearWishlist: (state) => {
      return []; 
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
