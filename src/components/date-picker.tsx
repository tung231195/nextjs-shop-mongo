import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
interface TPropsCustomDatePicker extends DatePicker {
  handleChangeDate: () => void
}
const CustomDatePicker = (props:TPropsCustomDatePicker) => {
  const {date,handleChangeDate} = props
  
  return(
    <DatePicker 
      selected={date} 
      onChange={handleChangeDate} 
    />
  )
};

export default CustomDatePicker;