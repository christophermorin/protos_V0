import { AppBar, Toolbar, Button, Box, Drawer, IconButton } from '@mui/material'
import { useState } from 'react';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function NavBar() {
  const [sideBar, setSideBar] = useState(false)

  const toggleDrawer = () => {
    setSideBar(!sideBar)
  }
  return (
    <Box>
      <AppBar position="static">
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
            <Button color="inherit" component={Link} to="/active">Active</Button>
            <Button color="inherit" component={Link} to="/build">Build</Button>
            <Button color="inherit" component={Link} to="/library">Library</Button>
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
        Testing
      </Drawer>
    </Box>
  );
}

const styles = {
  display: "flex",
  justifyContent: "space-between",
}