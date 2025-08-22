import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "src/contexts/types";
import { getAllUserAction, updateMeAction } from "./userAction";


export interface initStateUser {
  users: UserDataType[],
  loading:boolean,
  user: UserDataType | null
}

const initialState = { users:[], user: null, loading:false } as initStateUser
//create Slice
export const userSlide = createSlice({
  
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // fetch all users
    builder.addCase(getAllUserAction.pending, (state, action) => {
        state.loading = true;
    })

    builder.addCase(getAllUserAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('update me action', action, state);
      state.users = [...state.users, ...action?.payload?.data.users]
    })
    builder.addCase(getAllUserAction.rejected, (state, action) => {
      state.loading = true;
    })
        // update me
    builder.addCase(updateMeAction.pending, (state, action) => {
        state.loading = true;
    })

    builder.addCase(updateMeAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('update me', action, state);
      state.user = {...state.user, ...action?.payload?.data.data}
    })
    builder.addCase(updateMeAction.rejected, (state, action) => {
      state.loading = true;
    })
  //   // create role
  //   builder.addCase(createRoleAction.fulfilled, (state, action) => {
  //     state.roles = [...state.roles,action?.payload?.data]
  //   })

  //  // delete role
  //   builder.addCase(deleteRoleAction.fulfilled, (state, action) => {
  //     console.log('delete state', state,action)
  //     const newRoles = state.roles.filter((role) => role.id != action.payload)
  //     state.roles = newRoles
  //   })


  },
});


export default userSlide.reducer;