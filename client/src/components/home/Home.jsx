import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandymanIcon from '@mui/icons-material/Handyman';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeDialog from './HomeDialog';

export default function Home() {
  const [open, setOpen] = useState(false);

  // Moved fetching all user protos to App

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    icon: {
      border: '1px solid black',
      height: '200px',
      width: '200px',
      cursor: 'pointer',
    },
    start: {
      border: '1px solid black',
      height: '200px',
      width: '180px',
    },
  };

  return (
    <Grid container justifyContent="center" alignItems="center" flexGrow={1} gap={5} height="100%">
      <Grid item>
        <Box>
          <HandymanIcon style={styles.icon} />
        </Box>
      </Grid>
      <Grid item onClick={openDialog}>
        <Box>
          <RocketLaunchIcon style={styles.icon} />
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <DashboardIcon style={styles.icon} />
        </Box>
      </Grid>
      <HomeDialog open={open} handleClose={handleClose} />
    </Grid>
  );
}