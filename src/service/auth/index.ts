import axiosInstance from "src/helpers/axious";
import { TPramsCreateRole, TPramsGetAllRoles, TPramsUpdateRole } from "src/views/type";

export const updateProfile = async(data:any)=> {
   const updateMe = await axiosInstance.put('auth/me',data)
   if(data) {
      return {
        data:updateMe
      }
   }else {
    return null; 
   }

}
export const getAllRoles = async(params:TPramsGetAllRoles) => {

   const roles = await axiosInstance.get('roles',{params})
   if(roles) {
      return roles;
   }else {
    return null; 
   }
}


export const getAllRoleById = async(_id:string) => {
   const roles = await axiosInstance.get(`roles/${_id}`)
   if(roles) {
      return roles;
   }else {
    return null; 
   }
}


export const updateRoleById = async(params:TPramsUpdateRole) => {
   const {id, name,permissions} = params
   const data = await axiosInstance.put(`roles/${id}`,{name,permissions})
   if(data) {
      return data;
   }else {
    return null; 
   }
}

export const CreateRole = async(params:TPramsCreateRole) => {

   const newRoles = await axiosInstance.post('roles',params)
   if(newRoles) {
      return newRoles;
   }else {
    return null; 
   }
}


export const deleteRole = async(roleId:string) => {

   const deleteRole = await axiosInstance.delete(`roles/${roleId}`)
   if(deleteRole) {
      return deleteRole;
   }else {
    return null; 
   }
}
