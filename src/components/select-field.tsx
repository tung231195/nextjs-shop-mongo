import { MenuItem, Select, SelectProps, styled } from "@mui/material";
import React from "react";

interface TPropSelectField extends SelectProps {
  options: {value:number,label:string}[]
}
const SelectFieldStype = styled(Select)<TPropSelectField>(({theme}) => {

  return {
    "& .MuiSelect-select" :{
      color:theme.palette.grey,
      border:"1px solid red"
    },
    "& .MuiInputBase-input":{
      padding: "8px 0"
    }
  }
})
const CustomSelectField = (props:TPropSelectField) => {
  const {value,label,onChange,options, ...rest} = props

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
      </SelectFieldStype>
    </>
  )
}

export default CustomSelectField