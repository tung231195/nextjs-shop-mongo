import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsCreateProduct, TPramsGetAllProduct, TPramsUpdateProduct } from "src/configs/@type/catalog/product";
import { CreateProduct, deleteProduct, getAllProducts, updateProduct } from "src/service/catalog/product"

// get All Product Types
export const getAllProductAction = createAsyncThunk("getAllProductAction", async (data:TPramsGetAllProduct) => {

    const allProduct = await getAllProducts(data);
    return allProduct
});
// create Product
export const createProductAction = createAsyncThunk("createProductAction", async (data:TPramsCreateProduct) => {

    const newData = await CreateProduct(data);
    return newData
});

// Update Product By Id
export const updateProductAction = createAsyncThunk("updateProductAction", async (data:TPramsUpdateProduct) => {
    const item = await updateProduct(data);
    return item

});

// DELETE Product By Id
export const deleteProductAction = createAsyncThunk("deleteProductAction", async (cityId:string) => {
    const deleteData = await deleteProduct(cityId);
    return deleteData
});
