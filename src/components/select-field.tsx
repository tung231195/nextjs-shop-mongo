import { Box, InputLabel, MenuItem, Select, SelectProps, styled } from "@mui/material";
import SelectInput, { SelectChangeEvent, SelectInputProps } from "@mui/material/Select/SelectInput"
import React from "react";
import internal from "stream";

interface TPropSelectField extends SelectProps {
  options: {value:number,label:string}[]
}

const SelectFieldStype = styled(Select)<TPropSelectField>(({theme}) => {
  return {
    "& .MuiSelect-select" :{
      color:"red",
      border:"1px solid red"
    },
    "& .MuiInputBase-input":{
      padding: "8px 0"
    }
  }
})


const CustomSelectField = (props:TPropSelectField) => {
    const {value,label,onChange,options, ...rest} = props
    console.log('check options',options)
  return (
    <>
    <SelectFieldStype
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={onChange}
      options={options}
      {...rest}
    >
      {options && options.map((option) => {
        return (
           <MenuItem defaultValue={0}  key={option.value} value={option.value}>{option.label}</MenuItem>
        )
      })}
{/* 
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem> */}
    </SelectFieldStype>
    </>
  )
}

export default CustomSelectField