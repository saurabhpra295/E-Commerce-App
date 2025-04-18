"use client";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const response = await fetch('https://dummyapi.com/products');
//     return response.json();
//   }
// );

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], 
    filteredItems: [], 
    loading: false,
    error: null,
    filters: {
      search: "", 
      category: "all",
    },
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.filteredItems = action.payload; 
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSearch(state, action) {
      state.filters.search = action.payload; 
      
      state.filteredItems = state.items.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.pending, (state) => {
  //       // state.status = 'loading';
  //       state.loading = true;
  //     })
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       // state.status = 'succeeded';
  //       state.loading = false;
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       // state.status = 'failed';
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });

  // },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSearch,
  setCategory,
} = productsSlice.actions;

export const fetchProducts = (currentPage = 1) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}?page=${currentPage}&limit=10`);
    dispatch(fetchProductsSuccess(response.data.products));
    return response.data.totalPages; 
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductsbyid = (id) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
    dispatch(fetchProductsSuccess(response.data));
    return response.data; 
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export default productsSlice.reducer;


