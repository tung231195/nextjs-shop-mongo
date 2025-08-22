import { OrderItem } from "src/configs/@type/checkout";
import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"

export const CreateOrder = async(params:OrderItem) => {

   const newOrder = await axiosInstance.post(CONFIG_API.Checkout.ORDER.INDEX,params)
   if(newOrder) {
      return newOrder;
   }else {
    return null; 
   }
}

