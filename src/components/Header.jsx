import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormAddMovie from './FormAddMovie';
import Menu from './Menu';
import {useState} from 'react'

export default function Header() {
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClickOpenMenu = () => {
        setOpenMenu(!openMenu);
      };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color = 'secondary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick ={handleClickOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Моя фильмотека
          </Typography>
          <Button onClick ={handleClickOpen} color="inherit">Добавить фильм</Button>
        </Toolbar>
      </AppBar>
      <FormAddMovie open= {open} setOpen = {setOpen}/>
      <Menu isOpen = {openMenu} closeMenu = {handleClickOpenMenu} />
    </Box>
    
  );
}