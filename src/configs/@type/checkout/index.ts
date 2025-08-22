import { DeliveryTypeDataType } from "../delivery-type"
import { PaymentTypeDataType } from "../payment-type"

export interface ProductItem {
      "name": string
      "amount": number
      "image": string
      "price": number
      "discount": number
      "product":string
}
export interface ShippingAddress {
   "fullName": string
    "address": string
    "city": string
    "phone": number
}

export interface OrderItem {
      orderItems:ProductItem[]
      paymentMethod:PaymentTypeDataType
      itemsPrice:number
      shippingPrice:number
      totalPrice:number
      fullName:string
      address:string
      city:string
      phone:string
      user:string
      isPaid:string
      paidAt:string
      email:string
      deliveryMethod:DeliveryTypeDataType
}

