import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { Box, createTheme, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CustomTextField from "src/components/text-field";
import { TPramsCreateDeliveryType } from "src/configs/@type/delivery-type";
import { AppDispatch } from "src/stores";
import { createCityAction, updateCityAction } from "src/stores/city/cityAction";
import { createDeliveryTypeAction, updateDeliveryTypeAction } from "src/stores/delivery-type/deliveryTypeAction";
import * as yup from "yup"

const DeliveryTypeUpdateCreateForm = (props:any) => {
  const {updateData,handleClose} = props
    const defaultTheme = createTheme();
    const {t} = useTranslation();
    const schema = yup
    .object({
      name: yup.string().required(),
      price: yup.number().required(),
    })
    .required()

    /** dispath */
    const dispatch =  useDispatch<AppDispatch>();
    const {
      control,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    })
    // const onSubmit = (data) => console.log(data)    
    const onSubmit = (params:TPramsCreateDeliveryType):void => {
      if (!updateData) {
            dispatch(createDeliveryTypeAction(params))            
      } else {
            dispatch(updateDeliveryTypeAction({_id:updateData._id,price:params.price,name:params.name}))
      }
      handleClose()
    };
    
    //use effect 
    useEffect(()=> {
        if(updateData) {
            reset({
              name: updateData.name,
              price: updateData.price
            })
        } else {
          reset({})          
        }
    },[updateData])
    return (
  
        <Grid container component="main" sx={{ height: 'auto' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'left',
            }}
          />
          <Grid item xs={12} sm={8} md={12} component ={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                {!updateData  ? t("create_new") : t("update") }
              </Typography>
              <form  onSubmit={handleSubmit(onSubmit)} >
                <Box>
                 <Controller
          
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField   
                          placeholder="Delivery Type  name"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                      name="name"
                    />
                </Box>
                                <Box>
                 <Controller
              
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField   
                          placeholder="Price"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                      name="price"
                    />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                 {!updateData  ? t("create_new") : t("update") }
                </Button>
        
              </form>
            </Box>
          </Grid>
        </Grid>
    );
}

export default DeliveryTypeUpdateCreateForm; 