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
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
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
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={option} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <>
      <AppBar position="relative" enableColorOnDark sx={{ height: '56px', justifyContent: 'center' }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={1}>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item marginLeft={{ xs: 0, md: 25 }}>
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
        <List sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 5,
        }}
        >
          <div>
            {sideBarOptions}
          </div>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        anchor="left"
        open
        variant="permanent"
        // onClose={toggleDrawer}
        sx={{ display: { xs: 'none', lg: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px', marginTop: '58px' } }}
      >
        <List sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 5,
        }}
        >
          <div>
            {sideBarOptions}
          </div>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

NavBar.propTypes = {
  handleOpenBuild: PropTypes.func.isRequired,
};

export default NavBar;
