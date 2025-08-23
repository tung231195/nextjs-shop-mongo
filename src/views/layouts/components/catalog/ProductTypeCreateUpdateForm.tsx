import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { Box, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CustomTextField from "src/components/text-field";
import { TPramsCreateProductType } from "src/configs/@type/catalog/product-type";
import { generateSlug } from "src/helpers/catalog/product-type";
import { AppDispatch } from "src/stores";
import { createProductTypeAction, updateProductTypeAction } from "src/stores/catalog/product-type/productTypeAction";
import * as yup from "yup"

const ProductTypeCreateUpdateForm = (props:any) => {

    //** state */
    //**props */
    const {updateData} = props

    //**theme */
    //const defaultTheme = createTheme();

    //** translation */
    const {t} = useTranslation();

    //** schema */
    const schema = yup
    .object({
      name: yup.string().required(),
      slug: yup.string()
    })
    .required()

    /** dispath */
    const dispatch =  useDispatch<AppDispatch>();
    const {
      control,
      handleSubmit,
      reset,
      getValues
    } = useForm({
      resolver: yupResolver(schema),
    })

    // const onSubmit = (data) => console.log(data)    
    const onSubmit = (params:TPramsCreateProductType):void=>  {
  
      if (!updateData) {
            dispatch(createProductTypeAction(params))            
      } else {
            dispatch(updateProductTypeAction({
              _id:updateData._id,
              name:params.name,
              slug:params.slug
            })
            )
      }
    };
    const TDefaultData = {
      name:'',
      slug: ''
    }

    useEffect(()=> {
        if(!updateData) {
          reset(TDefaultData)
        } else {
          reset(
            {
              name: updateData.name
            }
          )
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
                          placeholder="type product"
                          onBlur={onBlur}
                          onChange= {(e) => {
                            const value = e.target.value
                            onChange(value)
                            reset({
                              ...getValues(),
                              slug:generateSlug(value)
                            })
                          }}
                          value={value}
                          label="Name"
                        />                        
                      )}
                      name="name"
                    />
                </Box>
                <Box>
                 <Controller
                      defaultValue=""
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField   
                          disabled={true}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          label="Slug"
                        />
                        
                      )}
                      name="slug"
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

export default ProductTypeCreateUpdateForm; 