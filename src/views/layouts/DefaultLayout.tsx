import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NextPage } from 'next';
import HozLayout from './HozLayout';

type TProps = {
  children: React.ReactNode
}

const DefaultLayout:NextPage<TProps> = ({children}) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
     <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HozLayout open={false} toggleDrawer={toggleDrawer}  />

        {/* <VerLayout open={open} toggleDrawer={toggleDrawer} /> */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ maxWidth:'100%',mt: 4, mb: 4 }} maxWidth={false}>
              {children}
          </Container>
        </Box>
      </Box>
  );
}
export default DefaultLayout