import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreateProductType, TPramsGetAllProductType, TPramsUpdateProductType } from "src/configs/@type/catalog/product-type";

export const updateProductType = async(data:TPramsUpdateProductType)=> {
   const updated = await axiosInstance.put(`${CONFIG_API.CATALOG.PRODUCT_TYPE.INDEX}/${data._id}`,{name:data.name})
   if(updated) {
      return updated;
   }else {
    return null; 
   }

}

export const getAllProductTypes = async(params:TPramsGetAllProductType) => {
   const ProductTypes = await axiosInstance.get(`${CONFIG_API.CATALOG.PRODUCT_TYPE.INDEX}`,{params})
   if(ProductTypes) {
      return ProductTypes;
   }else {
    return null; 
   }
}

export const getAllProductTypeById = async(productTypeId:string) => {
   const productTypes = await axiosInstance.get(`${CONFIG_API.CATALOG.PRODUCT_TYPE.INDEX}/${productTypeId}`)
   if(productTypes) {
      return productTypes;
   }else {
    return null; 
   }
}

export const CreateProductType = async(params:TPramsCreateProductType) => {
   const newData = await axiosInstance.post(CONFIG_API.CATALOG.PRODUCT_TYPE.INDEX,params)
   if(newData) {
      return newData;
   }else {
    return null; 
   }
}


export const deleteProductType = async(productTypeId:string) => {

   const deleted = await axiosInstance.delete(`${CONFIG_API.CATALOG.PRODUCT_TYPE.INDEX}/${productTypeId}`)
   if(deleted) {
      return deleted;
   }else {
    return null; 
   }
}
