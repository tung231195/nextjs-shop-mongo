import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomTextField from "src/components/text-field";
import { AppDispatch } from "src/stores";
import { UserDataType } from "src/contexts/types";
import { updateMeAction } from "src/stores/user/userAction";
import { useEffect, useState } from "react";

interface TPropsNewAddress {
  handleBackAdress: () => void
  user: UserDataType | null
  openModalNewEditAdress:{open:boolean,_id:string}
}
const NewEditAdressForm = (props: TPropsNewAddress) => {
  const [addresses, setAddresses] = useState([{}]);
  const { handleBackAdress, user,openModalNewEditAdress } = props;
  const listAddress = user?.addresses

  //const { t } = useTranslation();
  const schema = yup
    .object({
      fullname: yup.string().required(),
      phoneNumber: yup.number().required(),
      location: yup.string().required(),
    })
    .required();

  /** dispath */
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  //effect 
   useEffect (() => {
     if(openModalNewEditAdress._id) {
        const myAddress = listAddress?.find((ad) => ad._id == openModalNewEditAdress._id)
        reset({
          fullname:user?.email,
          phoneNumber: myAddress?.phoneNumber,
          location:openModalNewEditAdress._id
        })
     } else {
        reset ({
          fullname:"",
          phoneNumber:0,
          location:""
        })
     }
   },[openModalNewEditAdress])

  // const onSubmit = (data) => console.log(data)
  const onSubmit = (data: any): void => {
    const address = {
      firstName: "Tonky ",
      lastName: "Kany",
      middleName: data.fullname,
      phoneNumber: data.phoneNumber,
      price: 10,
      discount: 10,
      product: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    };
    setAddresses([...listAddress, address]);
    const params = {
      email: user?.email,
      addresses: addresses,
    };

    dispatch(updateMeAction(params));
    console.log("on submit", data, params, user, addresses);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextField
                placeholder="Full Name"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="fullname"
          />
        </Box>
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextField
                placeholder="Phone"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
          />
        </Box>
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextField
                placeholder="City"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="location"
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        ></Button>
        <Button onClick={handleBackAdress}>Back</Button>
        <Button type="submit">Save A</Button>
      </form>
    </>
  );
};
export default NewEditAdressForm;
