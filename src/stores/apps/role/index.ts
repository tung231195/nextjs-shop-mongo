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
      builder.addCase(getRoleAction.pending, (state, action) => {
    })

     builder.addCase(getRoleAction.fulfilled, (state, action) => {
      state.roles = [...state.roles, ...action?.payload?.allRole?.data.roles]
    })
    builder.addCase(getRoleAction.rejected, (state, action) => {
    })

    //getAllRoleByIdAction 
    builder.addCase(getAllRoleByIdAction.pending, (state, action) => {
      
    })

     builder.addCase(getAllRoleByIdAction.fulfilled, (state, action) => {
       state.selectedRole = {
        id: action.payload?.data._id,
        name: action.payload?.data.name,
        permission: action.payload?.data.permissions
       }
      console.log('full fille role by id',action,state)
    })
    builder.addCase(getAllRoleByIdAction.rejected, (state, action) => {
    })
    // create role
    builder.addCase(createRoleAction.fulfilled, (state, action) => {
      state.roles = [...state.roles,action?.payload?.data]
    })

    //updateRoleAction
    builder.addCase(updateRoleAction.pending, (state, action) => {
      
    })
    builder.addCase(updateRoleAction.fulfilled, (state, action) => {
      state.selectedRole = {
        id:action.payload?.data._id, 
        name: action.payload?.data.name, 
        permission: action.payload?.data.permission
      }
      console.log('full fille updateRoleAction by id',action,state)
    })
    builder.addCase(updateRoleAction.rejected, (state, action) => {
    })

   // delete role
    builder.addCase(deleteRoleAction.fulfilled, (state, action) => {
      console.log('delete state', state,action)
      const newRoles = state.roles.filter((role) => role.id != action.payload)
      state.roles = newRoles
    })


  },
});


export default roleSlide.reducer;