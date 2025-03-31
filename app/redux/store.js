import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice'; 
import wishlistReducer from './wishlistSlice'; 

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, 
    wishlist: wishlistReducer, 
  },
});

export default store;
