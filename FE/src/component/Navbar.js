import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {  apiUserCart } from "../endpoint";


import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Badge
 } from "@material-ui/core";

import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  customBadge:{
    color: "white"
  }
}));


const cookies = new Cookies()

export default function PrimarySearchAppBar() {

  const trigger = useScrollTrigger();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = createMuiTheme({
    palette:{

        type:'dark'
    }

  })
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [isLoggedIn, setisLoggedIn] = useState(false)
  

  function tokenCheck(){

    let userToken = cookies.get("Login_Token");

    if(userToken != undefined){

      setisLoggedIn(true)
      axios.get(apiUserCart, {
        headers: {
          'Authorization': `Token ${userToken}`
        }
      })

    .then((res) => {

        console.log(res)

      })

    .catch(error => {
        console.log(error.response)
      })

    }else{

      setisLoggedIn(false)
    }

  }


  function deleteToken(){

    cookies.remove("Login_Token" ,{ path: '/' })
    cookies.remove("Login_ID" ,{ path: '/' })
    window.location.href='/'

  }



  const menuId = 'primary-search-account-menu';

  const renderMenuLogin = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >


      {isLoggedIn && (

          <MenuItem onClick={deleteToken}>
          logout 
          </MenuItem>
      )}

      {!isLoggedIn && (

          <MenuItem onClick={() => { window.location.href='/auth/signin'}}>
          login  
          </MenuItem>
      )}

    
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem onClick={() => {
							        window.location.href='/'
						          }}>
        <IconButton color="inherit">
            <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => {
							        window.location.href='/write/'
						          }}>
        <IconButton color="inherit">
            <NoteAddIcon />
        </IconButton>
        <p>Add Article</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {

    tokenCheck();

  }, [])

  return (

    <div className={classes.grow}>
      <Slide appear={false} direction="down" in={!trigger}>
      <AppBar style={{ background: '#FF6666' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Kompas News
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
                <HomeIcon 
                    onClick={() => {
							        window.location.href='/'
						      }}/>
            </IconButton>
            <IconButton color="inherit">


            <NoteAddIcon
                    onClick={() => {
							        window.location.href='/write/'
						          }}/>

            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </Slide>
      {renderMobileMenu}
      {renderMenuLogin}
    </div>
  );
}
