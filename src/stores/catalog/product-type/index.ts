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
    builder.addCase(getAllProductTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(getAllProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productTypes = [...state.productTypes, ...action?.payload?.data?.productTypes] 
    })
    builder.addCase(getAllProductTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // create new productType
    builder.addCase(createProductTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(createProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productTypes = [...state.productTypes,action.payload?.data]
    })
    builder.addCase(createProductTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // update  productType
    builder.addCase(updateProductTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(updateProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.productTypes.findIndex(item => item.slug == action.payload?.data.slug);
      state.productTypes[index] = action.payload?.data;
     })
    builder.addCase(updateProductTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // Delete  productType
    builder.addCase(deleteProductTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(deleteProductTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      const newListProductTypes = state.productTypes.filter((productType) => productType.slug != action.payload?.data.slug )
      state.productTypes = newListProductTypes;
    })
    builder.addCase(deleteProductTypeAction.rejected, (state) => {
      state.loading = true;
    })

  },
});


export default productTypeSlide.reducer;