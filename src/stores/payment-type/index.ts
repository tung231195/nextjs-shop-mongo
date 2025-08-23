import { createSlice } from "@reduxjs/toolkit";
import { createPaymentTypeAction, deletePaymentTypeAction, getAllPaymentTypeAction, updatePaymentTypeAction } from "./paymentTypeAction";
import { PaymentTypeDataType } from "src/configs/@type/payment-type";

export interface initStatePaymentType {
  payments: PaymentTypeDataType[],
  loading:boolean,
  payment: PaymentTypeDataType | null
}
const initialState = { payments:[], payment: null, loading:false } as initStatePaymentType

//create Slice
export const paymentSlide = createSlice({
  
  name: "payment",
  initialState,
  reducers: {
  },
  extraReducers: builder => {

    // fetch all payments
    builder.addCase(getAllPaymentTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(getAllPaymentTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all payments',action?.payload?.data);
      state.payments = [...state.payments, ...action?.payload?.data?.paymentTypes] 
    })
    builder.addCase(getAllPaymentTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // create new payment
    builder.addCase(createPaymentTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(createPaymentTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('new payment 11',action.payload,action.payload?.data)
      state.payments = [...state.payments, { name:action.payload?.data.name,type:action.payload?.data.type, _id:action.payload?.data._id}]
    })
    builder.addCase(createPaymentTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // update  payment
    builder.addCase(updatePaymentTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(updatePaymentTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.payments.findIndex(item => item._id == action.payload?.data._id);
      state.payments[index] = action.payload?.data;
      console.log('update payment',action.payload?.data,index)
    
     // state.payments = [...state.payments, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(updatePaymentTypeAction.rejected, (state) => {
      state.loading = true;
    })

    // Delete  payment
    builder.addCase(deletePaymentTypeAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(deletePaymentTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      const newListPaymentTypes = state.payments.filter((payment) => payment._id != action.payload?.data._id )
      state.payments = newListPaymentTypes;
    })
    builder.addCase(deletePaymentTypeAction.rejected, (state) => {
      state.loading = true;
    })

  },
});


export default paymentSlide.reducer;