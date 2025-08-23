import { createSlice } from "@reduxjs/toolkit";
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
    builder.addCase(getAllCityAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(getAllCityAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('get all citys',action?.payload?.data);
      console.log('action',action)
      state.cities = [...state.cities, ...action?.payload?.data?.cities] 
    })
    builder.addCase(getAllCityAction.rejected, (state) => {
      state.loading = true;
    })

    // create new city
    builder.addCase(createCityAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(createCityAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cities = [...state.cities, {name:action.payload?.data.name, _id:action.payload?.data._id}]
    })
    builder.addCase(createCityAction.rejected, (state) => {
      state.loading = true;
    })

    // update  city
    builder.addCase(updateCityAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(updateCityAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.cities.findIndex(item => item._id == action.payload?.data._id);
      state.cities[index] = action.payload?.data;
    })
    builder.addCase(updateCityAction.rejected, (state) => {
      state.loading = true;
    })

    // Delete  city
    builder.addCase(deleteCityAction.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(deleteCityAction.fulfilled, (state, action) => {
      state.loading = false;
      const newListCitys = state.cities.filter((city) => city._id != action.payload?.data._id )
      state.cities = newListCitys;
    })
    builder.addCase(deleteCityAction.rejected, (state) => {
      state.loading = true;
    })

  },
});


export default citySlide.reducer;