import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateRole, deleteRole,getAllRoleById,getAllRoles, updateRoleById } from "src/service/auth";
import { TPramsCreateRole, TPramsGetAllRoles, TPramsUpdateRole } from "src/views/type";


// get All Roles
export const getRoleAction = createAsyncThunk("getRoleAction", async (data:TPramsGetAllRoles) => {
  try {
    const allRole = await getAllRoles(data);
    return {allRole}
  } catch (error) {
  }
});

// get All Roles By Id
export const getAllRoleByIdAction = createAsyncThunk("getAllRoleByIdAction", async (_id:string) => {
  try {
    const allRole = await getAllRoleById(_id);
    return allRole
  } catch (error) {
  }
});


// create User
export const createRoleAction = createAsyncThunk("createRoleAction", async (data:TPramsCreateRole) => {
  try {
    const newRole = await CreateRole(data);
    return newRole
  } catch (error) {
   
  }
});

// Update Role By Id
export const updateRoleAction = createAsyncThunk("updateRoleAction", async (data:TPramsUpdateRole) => {
  try {
    const allRole = await updateRoleById(data);
    return allRole
  } catch (error) {
  }
});

// DELETE User
export const deleteRoleAction = createAsyncThunk("deleteRoleAction", async (roleId:string) => {
  try {
    console.log('delete role params',roleId)
    const deletedRole = await deleteRole(roleId);
    console.log('ddddddddd get new role',roleId, deletedRole);
    return roleId
    
  } catch (error) {
   
  }
});
