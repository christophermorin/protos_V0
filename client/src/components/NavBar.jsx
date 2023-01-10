import { AppBar, Toolbar, Button, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import InboxIcon from '@mui/icons-material/Inbox';

export default function NavBar() {
  const [sideBar, setSideBar] = useState(false)

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
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={sideBar}
        onClose={toggleDrawer}
        sx={{ width: 200 }}
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