import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomTextField from 'src/components/text-field';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TPramsCreateRole } from 'src/views/type';
import { useDispatch } from 'react-redux';
import { createRoleAction } from 'src/stores/apps/role/roleAction';

// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme();
const schema = yup
  .object({
    name: yup.string().required()
  })
  .required()


const  RoleCreate =(props:any) => {

  /** auth context */
  ///const {login,user} = useAuth();
  /** dispath */
  const dispath =  useDispatch();
  const {isEdit} = props;
  const {
    control,
    handleSubmit,
    formState: {  },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const onSubmit = (data) => console.log(data)
  const onSubmit = (params:TPramsCreateRole):void => {
    if(isEdit)  {

     // dispath(updateRoleAction(params))
    } else {
      dispath(createRoleAction(params))
    }

  };

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
              {!isEdit  ? 'Create New Role' : 'Update Role' }
            </Typography>
            <form  onSubmit={handleSubmit(onSubmit)} >
              <Box>
               <Controller
                    defaultValue=""
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        placeholder="Role name"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name="name"
                  />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               {!isEdit  ? 'Create New Role' : 'Update Role' }
              </Button>
      
            </form>
          </Box>
        </Grid>
      </Grid>
  );
}
export default RoleCreate