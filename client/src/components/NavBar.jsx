import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import InboxIcon from '@mui/icons-material/Inbox';
import { setUserAuth } from '../reducers/userAuthReducer';
import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function NavBar() {
  const [sideBar, setSideBar] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    window.localStorage.clear()
    setAnchorEl(null);
    dispatch(setUserAuth(null))
  }

  const toggleDrawer = () => {
    setSideBar(!sideBar)
  }

  const tempList = ['Home', 'Dashboard', 'Resources', 'Market'].map(item => {
    return (
      <ListItem disablePadding key={item}>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    )
  })

  return (
    <Box height={56}>
      <AppBar position="relative" sx={{ height: 'inherit', justifyContent: 'center' }}>
        <Toolbar style={styles}>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/active">Active</Button>
            <Button color="inherit" component={Link} to="/build">Build</Button>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
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
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={sideBar}
        variant="temporary"
        onClose={toggleDrawer}
        sx={{
          display: { md: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px' },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 5 }}>
          <div>
            {tempList}
          </div>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        anchor='left'
        open
        variant="permanent"

        // onClose={toggleDrawer}
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px', backgroundColor: '#1976d2' },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: 5 }}>
          <div>
            {tempList}
          </div>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

    </Box>
  );
}

const styles = {
  display: "flex",
  justifyContent: "space-between",
}