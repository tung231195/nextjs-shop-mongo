import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button } from "@mui/material";
import { Box, createTheme, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "src/components/text-field";
import { TPramsCreateProduct } from "src/configs/@type/catalog/product";
import { generateSlug } from "src/helpers/catalog/product-type";
import { AppDispatch, RootState } from "src/stores";
import { createProductAction, updateProductAction } from "src/stores/catalog/product/productAction";
import * as yup from "yup"
import CustomEditorRich from "src/components/editor-rich";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { TPramsCreateProductType, TPramsGetAllProductType } from "src/configs/@type/catalog/product-type";
import CustomSelectField from "src/components/select-field";
import CustomSwitches from "src/components/switch-toogle";
import CustomDatePicker from "src/components/date-picker";
import { getAllCityAction } from "src/stores/city/cityAction";
import { TPramsGetAllCity } from "src/configs/@type/city";
import { SelectChangeEvent } from "@mui/material";
import { getAllProductTypeAction } from "src/stores/catalog/product-type/productTypeAction";
import { stat } from "fs";
import { _fileToBase64 } from "src/helpers/profile";


const ProductCreateUpdateForm = (props:any) => {
    //** state */
    const [file, setFile] = useState<File | null>(null);
    const [avatar, setAvatar] = useState<String>("");
    const [location, setLocation] = useState("")
    const [type, setType] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [status,setStatus] = useState<boolean>(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [date, setDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    /**ref */
    const inputHref = useRef<HTMLInputElement>(null);
    //**props */
    const {updateData,handleClose} = props
    //**theme */
    const defaultTheme = createTheme();
    //** translation */
    const {t} = useTranslation();
    //** schema */
    const schema = yup
    .object({
      name: yup.string().required(),
      slug: yup.string().required(),
      price: yup.string().required(),
      status: yup.boolean().required(),
      location: yup.string(),
      image:yup.string(),
      description:yup.string(),
      discountStartDate: yup.date(),
      discountEndDate: yup.date(),
      discount: yup.number(),
      sold: yup.number(),
      type: yup.string(),
      countInStock: yup.number(),
      

    })
    .required()
    /** dispath */
    const dispatch =  useDispatch<AppDispatch>();
    const cityOptions = useSelector((state:RootState) => state.citySlide.cities)
    const productTypes = useSelector((state:RootState)=>state.productTypeSlide.productTypes)
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      getValues
    } = useForm({
      resolver: yupResolver(schema),
    })

    const TDefaultData:TPramsCreateProduct = {
        name: "",
        slug: "",
        image: "",
        location: "",
        price: 0,
        countInStock: 0,
        description: "",
        discount: 0,
        sold: 0,
        type: "",
        discountStartDate: new Date(),
        discountEndDate: new Date(),
        status: 0
      }
    
    //** use effect */

    useEffect(()=> {
      console.log('data update',updateData);
        if(!updateData) {
          reset(TDefaultData)
        } else {
          updateData.type=updateData?.type?.id
          updateData.location = updateData.location.id
          reset(
            updateData
          )
        }
    },[updateData])
    
    // const onSubmit = (data) => console.log(data)    
    const onSubmit = (params:TPramsCreateProduct):void=>  {
      params.location = location
      params.type = type
      params.status = +status
      params.description = htmlContent
      params.discountEndDate = endDate
      params.discountStartDate = date
      params.image = avatar as string
      if (!updateData) {
            dispatch(createProductAction(params))            
      } else {
            console.log('data update 111',params)
            const {      
                name,
                slug,
                image,
                location,
                price,
                countInStock,
                description,
                discount,
                sold,
                type,
                discountStartDate,
                discountEndDate,
                status
              } = params
            dispatch(updateProductAction({
                  _id:updateData._id,
                  name,
                  slug,
                  image,
                  location,
                  price,
                  countInStock,
                  description,
                  discount,
                  sold,
                  type,
                  discountStartDate,
                  discountEndDate,
                  status
            }))
      }
     // handleClose()
    };


    const onEditorStateChange = (newEditorState:any):void => {
        setEditorState(newEditorState);
        const rawContentState = convertToRaw(newEditorState.getCurrentContent());
        setHtmlContent(draftToHtml(rawContentState));
    };
    const handleChange = () => {
        setStatus(!status);
    }
    const handleChangeDate =(date:Date) => {
      setDate(date)
    }

    const handleChangeEndDate =(endDate:Date) => {
      setEndDate(endDate)
    }

    const handleOnChangeCity=(event: SelectChangeEvent) => {
      setLocation(event.target.value as string)
    }

    const handleOnChangeType=(event: SelectChangeEvent) => {

      setType(event.target.value as string)
    }

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

      if (e.target.files) {
        const toBase64 =  await _fileToBase64(e.target.files[0]);
        setAvatar(String(toBase64));
        setFile(e.target.files[0]);
      }
      
  }

  const handleFileUpload = () => {
      inputHref.current?.click();
  };

    useEffect (()=> { 
      let params:TPramsGetAllCity = {
        limit:10,
        page:1
      }
      dispatch(getAllCityAction(params));
    },[]) 

    useEffect (()=> { 
      let params:TPramsGetAllProductType = {
          limit:10,
          page:1
      }
      dispatch(getAllProductTypeAction(params));
    },[]) 
    // convert 
  let locationOptions =    cityOptions.map ((city )=> {
      return {
        label: city.name,
        value: city._id
      }
    })

    
    let productTypeOptions =  productTypes.map ((type )=> {
      return {
        label: type.name,
        value: type._id,
        _id: type._id
      }
    })


    console.log('aaaaaaaaa',errors)
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
                width:"100%"
              }}
            >
              <Typography component="h1" variant="h5">
                {!updateData  ? t("create_new") : t("update") }
              </Typography>
              <form  onSubmit={handleSubmit(onSubmit)} >
                <Grid container>
                    <Grid item xs={6} md={6}>
                        <Box>
                        <Controller
                              // defaultValue={updateData && updateData.name}
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
                        <Box>
                          <Typography>Product Type</Typography>
                          <CustomSelectField onChange={handleOnChangeType} options = {productTypeOptions} />
                        </Box>
                        <Box>
                          <Typography>{t("status")}</Typography>
                          <CustomSwitches checked={status} handleChange={handleChange}  />
                        </Box>     
                            <Box >
                        <Avatar 
                          onClick={handleFileUpload}
                          sx={{ width: 134, height: 134 }}
                          alt="Remy Sharp" 
                          //src="https://mui.com/static/images/avatar/1.jpg" 
                          src={`data:image/png;base64,${avatar}`}
                          />
                        <input 
                          ref={inputHref} 
                          hidden 
                          id="file" 
                          type="file" 
                          accept="image/*"  
                          onChange={handleFileChange} />
                      </Box>          
                            </Grid>
                    <Grid item xs={6} md={6}>
                        <Box>
                          <Controller
                              // defaultValue={updateData && updateData.name}
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextField   
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
                                  label="Price"
                                />                        
                              )}
                              name="price"
                            />
                        </Box>
                        <Box>
                          <Controller
                              // defaultValue={updateData && updateData.name}
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextField   
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
                                  label="Dicount"
                                />                        
                              )}
                              name="discount"
                            />
                        
                        </Box>
                          <CustomDatePicker date={date} handleChangeDate={handleChangeDate} label="Discount Start Date" />
                          <CustomDatePicker date={endDate} handleChangeDate={handleChangeEndDate} label="Discount End Date" />
                        <Box>
                          <Controller
                              // defaultValue={updateData && updateData.name}
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextField   
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
                                  label="Sold"
                                />                        
                              )}
                              name="sold"
                            />
                        </Box>
                        <Box>
                          <Typography>City</Typography>
                          <CustomSelectField onChange={handleOnChangeCity} options = {locationOptions} />
                        </Box>
                        <Box>
                           <CustomEditorRich editorState={editorState}  onEditorStateChange={onEditorStateChange} />     
                        </Box>
                       
                    </Grid>
                </Grid>

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

export default ProductCreateUpdateForm; 