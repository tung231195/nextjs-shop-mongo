import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Box, Collapse, List } from '@mui/material';

  const MainListItems =(items:any) => {
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
      setOpen(!open);
    };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {items.items && items.items.length > 0  &&  items.items.map((menu:any) => {

        return (
          <Box key={menu.id}>
            <ListItemButton sx={menu.childrens && { pl: '10px' } } onClick={handleClick}>
              <ListItemIcon>
                {/* <InboxIcon /> */}
              </ListItemIcon>
              <ListItemText primary={menu.title} />
              {open ? 'Less' : 'More'}
            </ListItemButton>
              {menu.childrens && menu.childrens.length >0 && 
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menu.childrens.length > 0 &&menu.childrens.map((child:any) => {

                        return (
                          <SubMenuList key={child.id} child={child} open={open} level={1} handleClick={handleClick} />
                        )
                    })}

                 </List>
              </Collapse>
            }
          </Box>
        )
      })
    }

    </List>  
   )
  };
export const SubMenuList = (props:any) => {
  const {child,level, handleClick} = props

  return (   
          <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton key={child.id} sx={child.childrens && { pl: `${level*20}px` } } onClick={handleClick}>
                    <ListItemIcon>
                      {/* <StarBorder /> */}
                    </ListItemIcon>
                    <ListItemText primary= {child.title} />
                      {child.childrens&& child.childrens.length > 0 && <h2>Parent</h2>}
                  </ListItemButton>
                  {child.childrens && child.childrens.length > 0 && 
                  
                    // console.log('props data ',props.child)    
                    child.childrens.map((c:any) => {

                      return (<SubMenuList key={`sub_${c.id}`} level={level+1} child={c} />)    
                    })          
                  }
            </List>
           </Collapse>
              
  )
}

export default MainListItems;