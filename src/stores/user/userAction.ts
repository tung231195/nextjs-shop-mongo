import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsGetAllUser } from "src/configs/@type/users";
import { getAllUsers, updateUser } from "src/service/users"

// get All Roles
export const getAllUserAction = createAsyncThunk("getAllUserAction", async (data:TPramsGetAllUser) => {
  try {
    const allUser = await getAllUsers(data);

    return allUser
  } catch (error) {
  }
});

export const updateMeAction = createAsyncThunk("updateMeAction",async(data:any) => {
    const updated  = await updateUser(data) 
    
    return updated
})

// // create User
// export const createUserAction = createAsyncThunk("createRoleAction", async (data:TPramsCreateUser) => {
//   try {
//     const User = await CreateRole(data);
//     return newUser
//   } catch (error) {
   
//   }
// });

// // Update Role By Id
// export const updateUserAction = createAsyncThunk("updateRoleAction", async (data:TPramsUpdateUser) => {
//   try {
//     const allUser = await updateRoleById(data);
//     return allUser
//   } catch (error) {
//   }
// });

// // DELETE User
// export const deleteUserAction = createAsyncThunk("deleteRoleAction", async (roleId:string) => {
//   try {
//     console.log('delete role params',roleId)
//     const deletedUser = await deleteRole(roleId);
//     console.log('ddddddddd get new role',roleId, deletedUser);
//     return roleId
    
//   } catch (error) {
   
//   }
// });
