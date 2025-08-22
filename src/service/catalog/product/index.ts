import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreateProduct, TPramsGetAllProduct, TPramsUpdateProduct } from "src/configs/@type/catalog/product";
import axios from "axios";

export const updateProduct = async(data:TPramsUpdateProduct)=> {
   console.log('update product',`${CONFIG_API.CATALOG.PRODUCT.INDEX}/${data._id}`)
   const updated = await axiosInstance.put(`${CONFIG_API.CATALOG.PRODUCT.INDEX}/${data._id}`,{name:data.name})
   console.log('update product aa',updated)
   if(updated) {
      return updated;
   }else {
    return null; 
   }

}

export const getAllProducts = async(params:TPramsGetAllProduct) => {
   
   const Products = await axiosInstance.get(`${CONFIG_API.CATALOG.PRODUCT.INDEX}`)
   console.log('get All Products', Products)
   if(Products) {
      return Products;
   }else {
    return null; 
   }
}

export const getAllProductsPublic = async(params:TPramsGetAllProduct) => {
   
   const Products = await axios.get(`${CONFIG_API.CATALOG.PRODUCT_PUBLIC.INDEX}/public`,
      {
      params: params
    }
   )
   console.log('get All Products public', Products)
   if(Products) {
      return Products;
   }else {
    return null; 
   }
}


export const getAllProductById = async(productId:string) => {

   const products = await axiosInstance.get(`${CONFIG_API.CATALOG.PRODUCT.INDEX}/${productId}`)
   console.log('get role by id', products)
   if(products) {
      return products;
   }else {
    return null; 
   }
}

export const CreateProduct = async(params:TPramsCreateProduct) => {

   const newData = await axiosInstance.post(CONFIG_API.CATALOG.PRODUCT.INDEX,params)
   if(newData) {
      return newData;
   }else {
    return null; 
   }
}


export const deleteProduct = async(productId:string) => {
   const deleted = await axiosInstance.delete(`${CONFIG_API.CATALOG.PRODUCT.INDEX}/${productId}`)
   if(deleted) {
      return deleted;
   }else {
    return null; 
   }
}
