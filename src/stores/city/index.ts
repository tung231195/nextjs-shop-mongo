import { createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "src/contexts/types";
import { createCityAction, deleteCityAction, getAllCityAction, updateCityAction } from "./cityAction";
import { CityDataType } from "src/configs/@type/city";


export interface initStateUser {
  cities: CityDataType[],
  loading:boolean,
  city: CityDataType | null
}

const initialState = { cities:[], city: null, loading:false } as initStateUser
//create Slice
export const citySlide = createSlice({
  
  name: "city",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    // fetch all citys
    builder.addCase(getAllCityAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getAllCityAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all citys',action?.payload?.data);
      console.log('action',action)
      state.cities = [...state.cities, ...action?.payload?.data?.cities] 
    })
    builder.addCase(getAllCityAction.rejected, (state, action) => {
      state.loading = true;
    })
    // create new city
    builder.addCase(createCityAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(createCityAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('new city',action.payload?.data)
      state.cities = [...state.cities, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(createCityAction.rejected, (state, action) => {
      state.loading = true;
    })

    // update  city
    builder.addCase(updateCityAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(updateCityAction.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.cities.findIndex(item => item._id == action.payload?.data._id);
      state.cities[index] = action.payload?.data;
      console.log('update city',action.payload?.data,index)
    
     // state.cities = [...state.cities, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(updateCityAction.rejected, (state, action) => {
      state.loading = true;
    })



    // Delete  city
    builder.addCase(deleteCityAction.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(deleteCityAction.fulfilled, (state, action) => {
      state.loading = false;
      let newListCitys = state.cities.filter((city) => city._id != action.payload?.data._id )
      state.cities = newListCitys;
      console.log('delete city',action.payload?.data)
     // state.cities = [...state.cities, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(deleteCityAction.rejected, (state, action) => {
      state.loading = true;
    })

  },
});


export default citySlide.reducer;