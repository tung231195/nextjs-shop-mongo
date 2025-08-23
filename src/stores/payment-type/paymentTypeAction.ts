import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsCreatePaymentType, TPramsGetAllPaymentType, TPramsUpdatePaymentType } from "src/configs/@type/payment-type";
import { CreatePaymentType, deletePaymentType, getAllPaymentTypes, updatePaymentType } from "src/service/payment-type"


// get All 
export const getAllPaymentTypeAction = createAsyncThunk("getAllPaymentTypeAction", async (data:TPramsGetAllPaymentType) => {
  try {
    const allPaymentType = await getAllPaymentTypes(data);
    
    return allPaymentType
  } catch (error) {
     return null;
  }
});

// create PaymentType
export const createPaymentTypeAction = createAsyncThunk("createPaymentTypeAction", async (data:TPramsCreatePaymentType) => {
  try {
    const newData = await CreatePaymentType(data);

    return newData
  } catch (error) {

    return null;
  }
});

// Update PaymentType By Id
export const updatePaymentTypeAction = createAsyncThunk("updatePaymentTypeAction", async (data:TPramsUpdatePaymentType) => {
  console.log('check payment update error',data)
  try {
    const allUser = await updatePaymentType(data);

    return allUser
  } catch (error) {
  }
});

// DELETE PaymentType By Id
export const deletePaymentTypeAction = createAsyncThunk("deletePaymentTypeAction", async (paymentId:string) => {
  try {
    const deleteData = await deletePaymentType(paymentId);

    return deleteData
  } catch (error) {
    console.log('error payment',error)
  }
});
