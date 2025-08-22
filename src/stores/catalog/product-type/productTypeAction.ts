import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsCreateProductType, TPramsGetAllProductType, TPramsUpdateProductType } from "src/configs/@type/catalog/product-type";
import { CreateProductType, deleteProductType, getAllProductTypes, updateProductType } from "src/service/catalog/product-type"


// get All Product Types
export const getAllProductTypeAction = createAsyncThunk("getAllProductTypeAction", async (data:TPramsGetAllProductType) => {

    const allProductType = await getAllProductTypes(data);
    return allProductType

});


// create ProductType
export const createProductTypeAction = createAsyncThunk("createProductTypeAction", async (data:TPramsCreateProductType) => {

    const newData = await CreateProductType(data);
    return newData

});

// Update ProductType By Id
export const updateProductTypeAction = createAsyncThunk("updateProductTypeAction", async (data:TPramsUpdateProductType) => {
 
    const allUser = await updateProductType(data);
    return allUser

});

// DELETE ProductType By Id
export const deleteProductTypeAction = createAsyncThunk("deleteProductTypeAction", async (cityId:string) => {
    const deleteData = await deleteProductType(cityId);
    return deleteData
});
