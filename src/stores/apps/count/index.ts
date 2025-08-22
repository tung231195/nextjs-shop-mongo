import { createSlice } from "@reduxjs/toolkit";

import { increaseAction } from "./countAction";

//create Slice
export const countSlide = createSlice({
  name: "countAction",
  initialState: {
   count:0
  },
  reducers: {
    searchUser: (state, action) => {
      console.log('dispath search user',action)
      state.count = action.payload -1;
    },
  },
  extraReducers: builder => {
    builder.addCase(increaseAction.fulfilled, (state, action) => {
      console.log('run to fullfille',state.count,action)
      state.count += 1;
    })
  },
});

export const { searchUser } = countSlide.actions;
export default countSlide.reducer;