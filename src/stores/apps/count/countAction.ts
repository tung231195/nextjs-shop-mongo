import { createAsyncThunk } from "@reduxjs/toolkit";

// create User
export const increaseAction = createAsyncThunk("increaseAction", async (data) => {
  try {
    console.log('data increaseAction',data);
    return {data}
    
  } catch (error) {
   
  }
});

// read User
export const descreaseAction = createAsyncThunk("descreaseAction", async (data) => {
  try {
    console.log('data descreaseAction');
  } catch (error) {
   
  }
});
