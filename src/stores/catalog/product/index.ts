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
    builder.addCase(getAllProductAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getAllProductAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all products',action?.payload?.data);
      state.products = [...state.products, ...action?.payload?.data?.products] 
    })
    builder.addCase(getAllProductAction.rejected, (state, action) => {
      state.loading = true;
    })
    // create new product
    builder.addCase(createProductAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('new product',action.payload?.data)
      state.products = [...state.products,action.payload?.data]
    })
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = true;
    })

    // update  product
    builder.addCase(updateProductAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.products.findIndex(item => item.slug == action.payload?.data.slug);
      state.products[index] = action.payload?.data;
      console.log('update product',action.payload?.data,index)
    
     // state.products = [...state.products, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = true;
    })



    // Delete  product
    builder.addCase(deleteProductAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;
      let newListProducts = state.products.filter((product) => product.slug != action.payload?.data.slug )
      state.products = newListProducts;
      console.log('delete product',action.payload?.data)
     // state.products = [...state.products, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.loading = true;
    })

  },
});


export default productSlide.reducer;