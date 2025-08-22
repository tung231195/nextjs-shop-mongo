import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsCreateDeliveryType, TPramsGetAllDeliveryType, TPramsUpdateDeliveryType } from "src/configs/@type/delivery-type";
import { CreateDeliveryType, deleteDeliveryType, getAllDeliveryTypes, updateDeliveryType } from "src/service/delivery-type"


// get All 
export const getAllDeliveryTypeAction = createAsyncThunk("getAllDeliveryTypeAction", async (data:TPramsGetAllDeliveryType) => {
  try {
    const allDeliveryType = await getAllDeliveryTypes(data);
    return allDeliveryType
  } catch (error) {
     return null;
  }
});

// create DeliveryType
export const createDeliveryTypeAction = createAsyncThunk("createDeliveryTypeAction", async (data:TPramsCreateDeliveryType) => {
  try {
    const newData = await CreateDeliveryType(data);
    return newData
  } catch (error) {
    return null;
  }
});

// Update DeliveryType By Id
export const updateDeliveryTypeAction = createAsyncThunk("updateDeliveryTypeAction", async (data:TPramsUpdateDeliveryType) => {
  try {
    console.log('price data',data)
    const allUser = await updateDeliveryType(data);
    return allUser
  } catch (error) {
  }
});

// DELETE DeliveryType By Id
export const deleteDeliveryTypeAction = createAsyncThunk("deleteDeliveryTypeAction", async (deliveryId:string) => {
  try {
    const deleteData = await deleteDeliveryType(deliveryId);
    return deleteData    
  } catch (error) {
   
  }
});
