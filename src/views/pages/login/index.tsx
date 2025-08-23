import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomTextField from 'src/components/text-field';
import { useAuth } from 'src/hooks/useAuth';
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TPramsLogin } from 'src/views/type';

function Copyright(props:any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
//const defaultTheme = createTheme();
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.number().positive().integer().required(),
  })
  .required()
const  SignInSide =() => {
const {login} = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const onSubmit = (data) => console.log(data)
  const onSubmit = (params:TPramsLogin) => {
      const user1 =login({      
      "email": "admin@gmail.com",
      "password": "123456789Kha@",
        rememberMe:true,
      });
      console.log('loginaction',params,user1)

  };

  return (

      <Grid container component="main" sx={{ height: '100vh' }}>
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
              Sign in
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
                        placeholder="Email name"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name="email"
                  />
              </Box>

              <Box>
               <Controller
                    defaultValue={1234343}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        placeholder="Password"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
                  {errors.password && <Typography>This is required.</Typography>}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
  );
}
export default SignInSide