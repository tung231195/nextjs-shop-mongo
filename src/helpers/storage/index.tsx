// ** Config
import { CartItem } from 'src/configs/@type/shopping-cart'
import authConfig from 'src/configs/auth'
import cartConfig from 'src/configs/shoppingcart'
export const setUserStoreData = (userData:string,accessToken:string,refreshToken:string) => {
  return {
    userData: window.localStorage.setItem(authConfig.userData,JSON.stringify(userData)),
    accessToken: window.localStorage.setItem(authConfig.storageTokenKeyName,accessToken),
    refreshToken: window.localStorage.setItem(authConfig.onTokenExpiration,refreshToken)
  }
}

export const getUserStoreData = () => {
  return {
    userData: window.localStorage.getItem(authConfig.userData),
    accessToken: window.localStorage.getItem(authConfig.storageTokenKeyName),
    refreshToken: window.localStorage.getItem(authConfig.onTokenExpiration)
  }
}

export const removeStoreData = () => {
   return {
    userData: window.localStorage.removeItem(authConfig.userData),
    accessToken: window.localStorage.removeItem(authConfig.storageTokenKeyName),
    refreshToken: window.localStorage.removeItem(authConfig.onTokenExpiration)
  }
}

//cart items
export const setCartItemsStoreData = (data:Record<string,CartItem[]>) => {
  return {
    cartItems: (typeof window !== "undefined") ? window.localStorage.setItem(cartConfig.cartItems,JSON.stringify(data)) : []
  }
}

export const getCartItemsStoreData = () => {
  return {
    cartItems: (typeof window !== "undefined") ? window.localStorage.getItem(cartConfig.cartItems) : []
  }
}

export const removeCartITemsStoreData = () => {
   return {
    cartItems: (typeof window !== "undefined") ? window.localStorage.removeItem(cartConfig.cartItems): []
  }
}