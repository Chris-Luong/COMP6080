/**
 * App bar with a primary search field from MUI
 */
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HotelIcon from '@mui/icons-material/Hotel';

import {
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar (props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (props.token !== null) {
    if (pathname === '/login' || pathname === '/register') {
      return <Navigate replace to="/dashboard"/>
    }
  } else if (props.token === null && pathname === '/dashboard') {
    return <Navigate replace to="/login"/>
  }

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = props.token
    ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose()
            navigate('/dashboard')
          }}
        >
          Your listings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose()
            props.logoutFn()
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      )
    : (
     <>
     <Menu
       anchorEl={anchorEl}
       anchorOrigin={{
         vertical: 'top',
         horizontal: 'right',
       }}
       id={menuId}
       keepMounted
       transformOrigin={{
         vertical: 'top',
         horizontal: 'right',
       }}
       open={isMenuOpen}
       onClose={handleMenuClose}
     >
       <MenuItem
         onClick={() => {
           handleMenuClose()
           navigate('/login')
         }}
       >
         Login
       </MenuItem>
       <MenuItem
         onClick={() => {
           handleMenuClose()
           navigate('/register')
         }}
       >
         Register
       </MenuItem>
     </Menu>

     </>
      );

  return (
     <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             onClick={() => navigate('/')}
             aria-label="open drawer"
             sx={{ mr: 2, ml: 2 }}
           >
             <HotelIcon sx={{ mr: 1 }} />
             <Typography
               variant="h6"
               noWrap
               component="div"
               sx={{ display: { xs: 'none', sm: 'block' } }}
             >
               AirBrB
             </Typography>
           </IconButton>
           <Search>
             <SearchIconWrapper>
               <SearchIcon />
             </SearchIconWrapper>
             <StyledInputBase
               placeholder="Search listings and cities"
               inputProps={{ 'aria-label': 'search' }}
             />
           </Search>
           <Box sx={{ flexGrow: 1 }} />
           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             <IconButton
               size="large"
               edge="end"
               aria-label="account of current user"
               aria-controls={menuId}
               aria-haspopup="true"
               onClick={handleProfileMenuOpen}
               color="inherit"
               sx={{ mr: 2 }}
             >
               <AccountCircle />
             </IconButton>
           </Box>
           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
             <IconButton
               size="large"
               aria-label="show more"
               aria-controls={menuId}
               aria-haspopup="true"
               onClick={handleProfileMenuOpen}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
           </Box>
         </Toolbar>
       </AppBar>
       {renderMenu}
     </Box>
  );
}

Navbar.propTypes = {
  token: PropTypes.string,
  user: PropTypes.string,
  logoutFn: PropTypes.func,
}
