import { NavLink } from "react-router-dom";
import { Grid, Container, Divider, Drawer, List, ListItem, Typography } from '@mui/material'

function Menu({isOpen, closeMenu}) {
  

  return (
    <>
      <Drawer
      anchor='left'
      open = {isOpen}
      onClose = {closeMenu}
    >
      <List
        sx={{ width: '20rem', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <Typography
            variant = 'h2'
            >
            Меню
          </Typography>
        </ListItem>
        <Divider/>
        <ListItem>
          <Typography
            variant = 'h6'
            >
            <NavLink to="/" >
              Главная
            </NavLink>
            </Typography>
        </ListItem>
        <ListItem>
        <Typography
            variant = 'h6'
            >
            <NavLink to="/toWatch">
              Буду смотреть
            </NavLink>
            </Typography>
        </ListItem>
        
      </List>
    </Drawer>
    </>
    
    
  );
}

export default Menu;