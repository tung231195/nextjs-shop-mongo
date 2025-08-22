import { TPramsGetAllUser } from "src/configs/@type/users";
import axiosInstance from "src/helpers/axious";
import CONFIG_API from "src/configs/api"
import { TPramsCreateCity, TPramsGetAllCity, TPramsUpdateCity } from "src/configs/@type/city";

export const updateCity = async(data:TPramsUpdateCity)=> {
   console.log('update city',`${CONFIG_API.CITY.INDEX}/${data._id}`)
   const updated = await axiosInstance.put(`${CONFIG_API.CITY.INDEX}/${data._id}`,{name:data.name})
   console.log('update city aa',updated)
   if(updated) {
      return updated;
   }else {
    return null; 
   }

}

export const getAllCitys = async(params:TPramsGetAllCity) => {
   
   const cities = await axiosInstance.get(`${CONFIG_API.CITY.INDEX}`)
   console.log('get All Citys', cities)
   console.log('kkkkkkkkkkkkkkkk')
   if(cities) {
      return cities;
   }else {
    return null; 
   }
}


export const getAllCityById = async(cityId:string) => {

   const citys = await axiosInstance.get(`${CONFIG_API.CITY.INDEX}/${cityId}`)
   console.log('get role by id', citys)
   if(citys) {
      return citys;
   }else {
    return null; 
   }
}

export const CreateCity = async(params:TPramsCreateCity) => {

   const newRoles = await axiosInstance.post(CONFIG_API.CITY.INDEX,params)
   if(newRoles) {
      return newRoles;
   }else {
    return null; 
   }
}


export const deleteCity = async(cityId:string) => {

   const deleted = await axiosInstance.delete(`${CONFIG_API.CITY.INDEX}/${cityId}`)
   if(deleted) {
      return deleted;
   }else {
    return null; 
   }
}
