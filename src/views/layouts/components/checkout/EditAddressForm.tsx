import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddressItem from "./AddressItem";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/stores";
import { AddressType, UserDataType } from "src/contexts/types";
interface TPropsEditAddress {
  handlAddNewAddress: () => void,
  hanldeUpdateAdress:() => void,
  user:UserDataType | null
}
  const EditAddressForm = (props: TPropsEditAddress) => {
  const { handlAddNewAddress,hanldeUpdateAdress,user } = props;
  const listAddress =user?.addresses

  console.log("listAddress", listAddress);
  return (
    <>
      <Typography>My Address</Typography>
      <Box>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">My Address</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {listAddress &&
              listAddress.map((address: AddressType) => {
                return (
                  <React.Fragment key={address._id}>
                    <AddressItem address={address} hanldeUpdateAdress={hanldeUpdateAdress} />
                  </React.Fragment>
                );
              })}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Button onClick={handlAddNewAddress}> Add New Address</Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button> Cancel</Button>
        <Button>Update</Button>
      </Box>
    </>
  );
};

export default EditAddressForm;
