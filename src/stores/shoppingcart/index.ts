import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "src/configs/@type/shopping-cart";
import { setCartItemsStoreData } from "src/helpers/storage";


export interface initStateCart {
  cartItems: CartItem[],
  loading:boolean
}

const initialState = { 
  cartItems:[], 
  loading:false ,
  totalItem:0,
  totalPrice:0
} as initStateCart
//create Slice
export const cartSlide = createSlice({
  
  name: "shoppingcart",
  initialState,
  reducers: {
      updateToCartAction : (state, action) => {
          console.log('add cart',action, state)
          state.cartItems = action.payload.carts ? [...action.payload.carts] : []
          setCartItemsStoreData({[action.payload.userId]:state.cartItems})
      }
  }
});

export const {updateToCartAction} = cartSlide.actions
export default cartSlide.reducer;