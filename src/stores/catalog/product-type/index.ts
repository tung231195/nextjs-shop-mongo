import { createSlice } from "@reduxjs/toolkit";
import { createProductTypeAction, deleteProductTypeAction, getAllProductTypeAction, updateProductTypeAction } from "./productTypeAction";
import { ProductTypeDataType } from "src/configs/@type/catalog/product-type";

export interface initStateUser {
  productTypes: ProductTypeDataType[],
  loading:boolean,
  productType: ProductTypeDataType | null
}

const initialState = { productTypes:[], productType: null, loading:false } as initStateUser
//create Slice
export const productTypeSlide = createSlice({
  
  name: "productType",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // fetch all productTypes
    builder.addCase(getAllProductTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getAllProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all productTypes',action?.payload?.data);
      state.productTypes = [...state.productTypes, ...action?.payload?.data?.productTypes] 
    })
    builder.addCase(getAllProductTypeAction.rejected, (state, action) => {
      state.loading = true;
    })
    // create new productType
    builder.addCase(createProductTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(createProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('new productType',action.payload?.data)
      state.productTypes = [...state.productTypes,action.payload?.data]
    })
    builder.addCase(createProductTypeAction.rejected, (state, action) => {
      state.loading = true;
    })

    // update  productType
    builder.addCase(updateProductTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(updateProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.productTypes.findIndex(item => item.slug == action.payload?.data.slug);
      state.productTypes[index] = action.payload?.data;
      console.log('update productType',action.payload?.data,index)
    
     // state.productTypes = [...state.productTypes, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(updateProductTypeAction.rejected, (state, action) => {
      state.loading = true;
    })



    // Delete  productType
    builder.addCase(deleteProductTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(deleteProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      let newListProductTypes = state.productTypes.filter((productType) => productType.slug != action.payload?.data.slug )
      state.productTypes = newListProductTypes;
      console.log('delete productType',action.payload?.data)
     // state.productTypes = [...state.productTypes, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(deleteProductTypeAction.rejected, (state, action) => {
      state.loading = true;
    })

  },
});


export default productTypeSlide.reducer;