import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreatePaymentType, TPramsGetAllPaymentType, TPramsUpdatePaymentType } from "src/configs/@type/payment-type";

export const updatePaymentType = async(data:TPramsUpdatePaymentType)=> {
   console.log('update payment',data)
   const updated = await axiosInstance.put(`${CONFIG_API.SYSTEM.ORDER.PAYMENT.INDEX}/${data._id}`,{name:data.name,type:data.type})
   console.log('update payment aa',updated)
   if(updated) {  
      return updated;
   }else {
    return null; 
   }

}

export const getAllPaymentTypes = async(params:TPramsGetAllPaymentType) => {
   
   const PaymentTypes = await axiosInstance.get(`${CONFIG_API.SYSTEM.ORDER.PAYMENT.INDEX}`,{params:params})
   console.log('get All PaymentTypes', PaymentTypes)
   if(PaymentTypes) {
      return PaymentTypes;
   }else {
    return null; 
   }
}


export const getAllPaymentTypeById = async(paymentId:string) => {

   const payments = await axiosInstance.get(`${CONFIG_API.SYSTEM.ORDER.PAYMENT.INDEX}/${paymentId}`)
   console.log('get role by id', payments)
   if(payments) {
      return payments;
   }else {
    return null; 
   }
}

export const CreatePaymentType = async(params:TPramsCreatePaymentType) => {

   const newRoles = await axiosInstance.post(CONFIG_API.SYSTEM.ORDER.PAYMENT.INDEX,params)
   if(newRoles) {
      return newRoles;
   }else {
    return null; 
   }
}


export const deletePaymentType = async(paymentId:string) => {

   const deleted = await axiosInstance.delete(`${CONFIG_API.SYSTEM.ORDER.PAYMENT.INDEX}/${paymentId}`)
   if(deleted) {
      return deleted;
   }else {
    return null; 
   }
}
