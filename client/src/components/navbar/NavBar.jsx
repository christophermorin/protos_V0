import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
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
import { setNotification, resetNotification } from '../../reducers/notificationsReducer';

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
    dispatch(setNotification({ title: 'User Logged out', severity: 'success' }));
    dispatch(resetNotification());
    // Clear all stores
  };

  const toggleDrawer = () => {
    setSideBar(!sideBar);
  };

  const sideBarOptions = ['Dashboard', 'Library'].map((option) => (
    <ListItem disablePadding key={option}>
      <ListItemButton component={Link} to={`/${option.toLowerCase()}`}>
        <ListItemIcon>
          <ArrowRightIcon sx={{ color: '#fff' }} />
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
        enableColorOnDark
        sx={{
          height: '56px',
          backgroundImage: 'unset',
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={1}>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ visibility: { md: 'hidden' } }}
              >
                <MenuIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={10}
              container
              gap={1}
              justifyContent="center"
            >
              <NavButton title="Home" nav="/" />
              <NavButton title="Active" nav="/active" />
              <NavButton title="Build" action={handleOpenBuild} />
            </Grid>
            <Grid
              container
              item
              xs={1}
              justifyContent="flex-end"
            >
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircle sx={{ color: '#fff' }} />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          anchor="left"
          open={sideBar}
          variant="temporary"
          onClose={toggleDrawer}
          sx={{
            display: {
              md: 'block',
              lg: 'none',
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              paddingTop: '56px',
            },
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
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: '#1f29372e',
              paddingTop: '56px',
            },
          }}
        >
          <Box>
            {sideBarOptions}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

NavBar.propTypes = {
  handleOpenBuild: PropTypes.func.isRequired,
};

export default NavBar;
