import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { NextPage } from 'next';
import mainListItems from './list_item';
import IconifyIcon from 'src/components/Icon';
import { Icon } from '@iconify/react/dist/iconify.js';
import MainListItems from './list_item';
import { ListMenu } from 'src/helpers/list-menu';




const drawerWidth: number = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
type TProps = {
 open:boolean,
 toggleDrawer: () => void
}
const items = ListMenu;

const VerLayout:NextPage<TProps> = ({open,toggleDrawer}) => {
  return (

     <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <Icon icon="material-symbols:menu" width="24" height="24" />
            </IconButton>
          </Toolbar>
          <Divider />
          <MainListItems items={items} />
        </Drawer>
      </Box>
  );
}
export default VerLayout