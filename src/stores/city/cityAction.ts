import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPramsCreateCity, TPramsGetAllCity, TPramsUpdateCity } from "src/configs/@type/city";
import { CreateCity, deleteCity, getAllCitys, updateCity } from "src/service/city"

// get All Roles
export const getAllCityAction = createAsyncThunk("getAllCityAction", async (data:TPramsGetAllCity) => {
  try {
    const allCity = await getAllCitys(data);

    return allCity
  } catch (error) {

     return null;
  }
});


// create City
export const createCityAction = createAsyncThunk("createCityAction", async (data:TPramsCreateCity) => {
  try {
    const newData = await CreateCity(data);

    return newData
  } catch (error) {

    return null;
  }
});

// Update City By Id
export const updateCityAction = createAsyncThunk("updateCityAction", async (data:TPramsUpdateCity) => {
  try {
    const allUser = await updateCity(data);

    return allUser
  } catch (error) {
  }
});

// DELETE City By Id
export const deleteCityAction = createAsyncThunk("deleteCityAction", async (cityId:string) => {
  try {
    const deleteData = await deleteCity(cityId);

    return deleteData
  } catch (error) {
    return error
  }
});
