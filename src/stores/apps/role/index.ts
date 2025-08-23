import { createSlice } from "@reduxjs/toolkit";
import { createRoleAction, deleteRoleAction, getAllRoleByIdAction, getRoleAction, updateRoleAction } from "./roleAction";

interface Role {
  id:string,
  name:string,
  permission:string[]
}
export interface initStateRole {
  roles: Role[],
  loading:boolean,
  selectedRole: Role | null
}

const initialState = { roles:[], loading:false, selectedRole:null } as initStateRole

//create Slice
export const roleSlide = createSlice({
  
  name: "roleAction",
  initialState,
  reducers: {
  },
  extraReducers: builder => {

    // fetch role
    builder.addCase(getRoleAction.fulfilled, (state, action) => {
      state.roles = [...state.roles, ...action?.payload?.allRole?.data.roles]
    })
    
    //getAllRoleByIdAction 
     builder.addCase(getAllRoleByIdAction.fulfilled, (state, action) => {
       state.selectedRole = {
        id: action.payload?.data._id,
        name: action.payload?.data.name,
        permission: action.payload?.data.permissions
       }
    })

    // create role
    builder.addCase(createRoleAction.fulfilled, (state, action) => {
      state.roles = [...state.roles,action?.payload?.data]
    })

    //updateRoleAction
    builder.addCase(updateRoleAction.fulfilled, (state, action) => {
      state.selectedRole = {
        id:action.payload?.data._id, 
        name: action.payload?.data.name, 
        permission: action.payload?.data.permission
      }
    })

   // delete role
    builder.addCase(deleteRoleAction.fulfilled, (state, action) => {
      const newRoles = state.roles.filter((role) => role.id != action.payload)
      state.roles = newRoles
    })
  },
});


export default roleSlide.reducer;