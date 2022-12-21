import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={styles}>
          <Button color="inherit" component={Link} to="/active">Active</Button>
          <Button color="inherit" component={Link} to="/build">Build</Button>
          <Button color="inherit" component={Link} to="/library">Library</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const styles = {
  display: "flex",
  justifyContent: "center",
  gap: "20px"
}