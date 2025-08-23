import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderItem } from "src/configs/@type/checkout";
import { CartItem } from "src/configs/@type/shopping-cart"
import { setCartItemsStoreData } from "src/helpers/storage";
import { CreateOrder } from "src/service/checkout";

export const updateCartAction=(cloneCartItems:CartItem[]) => {

      const totalItem = cloneCartItems.reduce(
        (total, currentValue) => total + currentValue.amount,
        0,
      );
        const totalPrice = cloneCartItems.reduce(
      (total, cartItem) => {
        const discount = (cartItem.discount/100)*cartItem.price  

        return total + (cartItem.amount*(cartItem.price - discount))
      },
      0,
    );
    setCartItemsStoreData(cloneCartItems)
    
    return {cloneCartItems,totalItem,totalPrice}
}

export const removeCartAction  = (idCart:string,cloneCartItems:CartItem[]) => {
    cloneCartItems.filter((item)  => item._id != idCart) 

   return  updateCartAction(cloneCartItems);

}

export const createOrderAction =createAsyncThunk("createOrderAction", async (order:OrderItem) => {

  return await CreateOrder(order)
})