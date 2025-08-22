import { createSlice } from "@reduxjs/toolkit";
import { createDeliveryTypeAction, deleteDeliveryTypeAction, getAllDeliveryTypeAction, updateDeliveryTypeAction } from "./deliveryTypeAction";
import { DeliveryTypeDataType } from "src/configs/@type/delivery-type";


export interface initStateDeliveryType {
  deliveries: DeliveryTypeDataType[],
  loading:boolean,
  delivery: DeliveryTypeDataType | null
}

const initialState = { deliveries:[], delivery: null, loading:false } as initStateDeliveryType
//create Slice
export const deliverySlide = createSlice({
  
  name: "delivery",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // fetch all deliverys
    builder.addCase(getAllDeliveryTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getAllDeliveryTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all deliverys',action?.payload?.data);
      state.deliveries = [...state.deliveries, ...action?.payload?.data?.deliveryTypes] 
    })
    builder.addCase(getAllDeliveryTypeAction.rejected, (state, action) => {
      state.loading = true;
    })
    // create new delivery
    builder.addCase(createDeliveryTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(createDeliveryTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('new delivery',action.payload?.data)
      state.deliveries = [...state.deliveries, {name:action.payload?.data.name,price:action?.payload?.price, _id:action.payload?.data._id}]
    })
    builder.addCase(createDeliveryTypeAction.rejected, (state, action) => {
      state.loading = true;
    })

    // update  delivery
    builder.addCase(updateDeliveryTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(updateDeliveryTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.deliveries.findIndex(item => item._id == action.payload?.data._id);
      state.deliveries[index] = action.payload?.data;
      console.log('update delivery',action.payload?.data,index)
    
     // state.deliveries = [...state.deliveries, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(updateDeliveryTypeAction.rejected, (state, action) => {
      state.loading = true;
    })



    // Delete  delivery
    builder.addCase(deleteDeliveryTypeAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(deleteDeliveryTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      let newListDeliveryTypes = state.deliveries.filter((delivery) => delivery._id != action.payload?.data._id )
      state.deliveries = newListDeliveryTypes;
      console.log('delete delivery',action.payload?.data)
     // state.deliveries = [...state.deliveries, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(deleteDeliveryTypeAction.rejected, (state, action) => {
      state.loading = true;
    })

  },
});


export default deliverySlide.reducer;