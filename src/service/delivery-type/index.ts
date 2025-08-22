import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreateDeliveryType, TPramsGetAllDeliveryType, TPramsUpdateDeliveryType } from "src/configs/@type/delivery-type";

export const updateDeliveryType = async(data:TPramsUpdateDeliveryType)=> {
   console.log('update delivery',`${CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX}/${data._id}`)
   const updated = await axiosInstance.put(`${CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX}/${data._id}`,{name:data.name,price:data.price})
   console.log('update delivery aa',updated)
   if(updated) {
      return updated;
   }else {
    return null; 
   }

}

export const getAllDeliveryTypes = async(params:TPramsGetAllDeliveryType) => {
   
   const deliverys = await axiosInstance.get(`${CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX}`)
   console.log('get All DeliveryTypes', deliverys)
   if(deliverys) {
      return deliverys;
   }else {
    return null; 
   }
}


export const getAllDeliveryTypeById = async(deliveryId:string) => {

   const deliverys = await axiosInstance.get(`${CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX}/${deliveryId}`)
   console.log('get role by id', deliverys)
   if(deliverys) {
      return deliverys;
   }else {
    return null; 
   }
}

export const CreateDeliveryType = async(params:TPramsCreateDeliveryType) => {

   const newRoles = await axiosInstance.post(CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX,params)
   if(newRoles) {
      return newRoles;
   }else {
    return null; 
   }
}


export const deleteDeliveryType = async(deliveryId:string) => {

   const deleted = await axiosInstance.delete(`${CONFIG_API.SYSTEM.ORDER.DILEVERY.INDEX}/${deliveryId}`)
   if(deleted) {
      return deleted;
   }else {
    return null; 
   }
}
