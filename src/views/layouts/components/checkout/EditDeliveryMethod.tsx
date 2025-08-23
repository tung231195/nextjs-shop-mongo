import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeliveryTypeDataType } from "src/configs/@type/delivery-type";
import { AppDispatch } from "src/stores";
import { updateDeliveryMethod } from "src/stores/checkout";

interface TPropsDelivery {
  deliveryOptions: DeliveryTypeDataType[];
}
const EditDeliveryMethod = (props: TPropsDelivery) => {
  const [delivery, setDelivery] = useState<DeliveryTypeDataType>()
  const { deliveryOptions } = props;
  const dispatch = useDispatch<AppDispatch>()
  const hanldeUpdateDelivery= () => {
    dispatch(updateDeliveryMethod(delivery))
  }

  return (
    <>
      <Box>
        <Typography>Select Delivery Method </Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {deliveryOptions &&
              deliveryOptions.map((delivery) => {
                
                return (
                  <Box key={delivery._id}>
                      <FormControlLabel onChange={()=>setDelivery(delivery)} value={delivery._id} control={<Radio />} label={delivery.name} />
                  </Box>
                );
              })}
          </RadioGroup>
        </FormControl>
        <Button onClick={hanldeUpdateDelivery}>Update</Button>
      </Box>
    </>
  );
};

export default EditDeliveryMethod;
