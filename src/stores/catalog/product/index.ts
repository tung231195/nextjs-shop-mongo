import { createSlice } from "@reduxjs/toolkit";
import { createProductAction, deleteProductAction, getAllProductAction, updateProductAction } from "./productAction";
import { ProductDataType } from "src/configs/@type/catalog/product";

export interface initStateUser {
  products: ProductDataType[],
  loading:boolean,
  product: ProductDataType | null
}
const initialState = { products:[], product: null, loading:false } as initStateUser

//create Slice
export const productSlide = createSlice({ 
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // fetch all products
    builder.addCase(getAllProductAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(getAllProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action?.payload?.data?.products] 
    })
    builder.addCase(getAllProductAction.rejected, (state) => {
      state.loading = true;
    })

    // create new product
    builder.addCase(createProductAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [...state.products,action.payload?.data]
    })
    builder.addCase(createProductAction.rejected, (state) => {
      state.loading = true;
    })

    // update  product
    builder.addCase(updateProductAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(item => item.slug == action.payload?.data.slug);
      state.products[index] = action.payload?.data;
    })
    builder.addCase(updateProductAction.rejected, (state) => {
      state.loading = true;
    })

    // Delete  product
    builder.addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;
      const newListProducts = state.products.filter((product) => product.slug != action.payload?.data.slug )
      state.products = newListProducts;
    })
    builder.addCase(deleteProductAction.rejected, (state) => {
      state.loading = true;
    })

  },
});

export default productSlide.reducer;