import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NavButton from '../buttons/NavButton';
import { setUserAuth } from '../../reducers/userAuthReducer';

function NavBar({ handleOpenBuild }) {
  const [sideBar, setSideBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    window.localStorage.clear();
    setAnchorEl(null);
    dispatch(setUserAuth(null));
    // TODO: Clear all states
  };

  const toggleDrawer = () => {
    setSideBar(!sideBar);
  };

  const sideBarOptions = ['Dashboard', 'Library'].map((option) => (
    <ListItem disablePadding key={option}>
      <ListItemButton component={Link} to={`/${option.toLowerCase()}`}>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText primary={option} />
      </ListItemButton>
    </ListItem>
  ));

  const drawerWidth = 200;

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        sx={{
          height: '56px',
          backgroundImage: 'unset',
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={1}>
              <IconButton
                size="large"
                color="secondary"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ visibility: { md: 'hidden' } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item marginLeft={{ xs: 0, md: '200px' }}>
              <NavButton title="Home" nav="/" />
              <NavButton title="Active" nav="/active" />
              <NavButton title="Build" action={handleOpenBuild} />
            </Grid>
            <Grid container item xs={1} justifyContent="flex-end">
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="secondary"
                onClick={handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: { md: drawerWidth, }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          anchor="left"
          open={sideBar}
          variant="temporary"
          onClose={toggleDrawer}
          sx={{
            display: { md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px' },
          }}
        >
          <div>
            {sideBarOptions}
          </div>
        </Drawer>

        <Drawer
          anchor="left"
          open
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px', marginTop: '58px' } }}
        >
          <div>
            {sideBarOptions}
          </div>
        </Drawer>
      </Box>
    </>
  );
}

NavBar.propTypes = {
  handleOpenBuild: PropTypes.func.isRequired,
};

export default NavBar;
