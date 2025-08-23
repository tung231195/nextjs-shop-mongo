import { createAsyncThunk } from "@reduxjs/toolkit";

// create User
export const increaseAction = createAsyncThunk("increaseAction", async (data) => {
  try {

    return data
  } catch (error) {
    return error
  }
});

// read User
export const descreaseAction = createAsyncThunk("descreaseAction", async (data) => {
  try {
    console.log('data descreaseAction',data);
  } catch (error) {
    return error
  }
});
