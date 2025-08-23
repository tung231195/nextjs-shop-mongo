import { configureStore } from '@reduxjs/toolkit'
import user from 'src/stores/apps/user'
import countSlide from 'src/stores/apps/count'
import roleSlide from 'src/stores/apps/role'
import userSlide from 'src/stores/user'
import citySlide from 'src/stores/city'
import productTypeSlide  from './catalog/product-type'
import productSlide  from './catalog/product'
import cartSlide from "./shoppingcart"
import deliverySlide from './delivery-type'
import paymentSlide from './payment-type'
import checkoutSlide  from './checkout'

export const store = configureStore({
  reducer: {
    user,
    countSlide,
    roleSlide,
    userSlide,
    citySlide,
    productTypeSlide,
    productSlide,
    cartSlide,
    deliverySlide,
    paymentSlide,
    checkoutSlide
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
