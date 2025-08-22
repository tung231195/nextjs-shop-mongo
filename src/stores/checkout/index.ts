import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { OrderItem, ShippingAddress } from "src/configs/@type/checkout";
import { DeliveryTypeDataType } from "src/configs/@type/delivery-type";

export interface initStateOrder {
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress,
  deliveryMethod:DeliveryTypeDataType,
  paymentMethod: string,

}

const initialState = { 
  orderItems:[],
  shippingAddress: {
    fullName: "string",
    address: "string",
    city: "string",
    phone: 0
  },
  deliveryMethod:{name:"",price:0,_id:""},
  paymentMethod: "",
  // itemsPrice: 0,
  // shippingPrice: 0,
  // totalPrice: 0,
  // user: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // isPaid: 0,
  // paidAt: "2025-08-19T14:44:26.028Z",
  // isDelivered: 0,
  // deliveredAt: "2025-08-19T14:44:26.028Z",
  // status: 0
} as initStateOrder
//create Slice
export const checkoutSlide = createSlice({
  
  name: "checkout",
  initialState,
  reducers: {
    updateDeliveryMethod: (state,action) =>{
      console.log("method",action,state)
      state.deliveryMethod = action.payload
    }
  }
});

export const {updateDeliveryMethod} = checkoutSlide.actions
export default checkoutSlide.reducer;