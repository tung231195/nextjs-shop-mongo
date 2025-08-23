import { Box, Button, FormControlLabel, Radio, Typography } from "@mui/material"
import { useState } from "react"
import { AddressType } from "src/contexts/types"

interface TPropsAddressItem {
  hanldeUpdateAdress: (e:any,_id:string) => void,
  address: AddressType
}
const AddressItem = (props:TPropsAddressItem) => {
  const {address,hanldeUpdateAdress} = props

  //state 
  const[editAddress, setEditAdress] = useState("")

  //handle
  const hanldeOnChangeAdress = (e:any) => {
    setEditAdress(e.target.value)
  }
  
  return(
    <Box sx={{display:"flex"}}>
      <Box> 
      <FormControlLabel 
        onChange={hanldeOnChangeAdress}
        value={address._id} 
        control={<Radio />} 
        label="Female" /></Box>
      <Box sx={{display:"flex", flexDirection:"column"}}>
          <Typography>{address.firstName}{address.middleName}{address.lastName}(+84) {address.phoneNumber}</Typography>
          <p>
            {address.location}
          </p>
          
        </Box>       
        <Box><Button onClick={(e)=>hanldeUpdateAdress(e,editAddress)}>Edit</Button></Box>
    </Box>

  )
}

export default AddressItem