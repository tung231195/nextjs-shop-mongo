import { TPramsGetAllUser } from "src/configs/@type/users";
import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreateRole,TPramsUpdateRole } from "src/views/type";

export const updateUser = async(data:any)=> {
   const updateMe = await axiosInstance.put('auth/me',data)
   if(data) {

      return {
        data:updateMe
      }
   }else {

    return null; 
   }

}

export const getAllUsers = async(params:TPramsGetAllUser) => {   
   const users = await axiosInstance.get(CONFIG_API.USER.INDEX,{params})
   if(users) {

      return users;
   }else {

    return null; 
   }
}


export const getAllUserById = async(_id:string) => {
   const roles = await axiosInstance.get(`roles/${_id}`)
   if(roles) {

      return roles;
   }else {

    return null; 
   }
}


export const updateUserById = async(params:TPramsUpdateRole) => {
   const {id, name,permissions} = params
   const data = await axiosInstance.put(`roles/${id}`,{name,permissions})
   if(data) {

      return data;
   }else {

      return null; 
   }
}

export const CreateUser = async(params:TPramsCreateRole) => {

   const newRoles = await axiosInstance.post('roles',params)
   if(newRoles) {

      return newRoles;
   }else {

    return null; 
   }
}


export const deleteUser = async(roleId:string) => {

   const deleteRole = await axiosInstance.delete(`roles/${roleId}`)
   if(deleteRole) {

      return deleteRole;
   }else {
      
    return null; 
   }
}
