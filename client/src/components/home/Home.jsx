import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandymanIcon from '@mui/icons-material/Handyman';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeDialog from './HomeDialog';

import HomeButton from '../buttons/HomeButton';

export default function Home() {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const styles = {
  //   icon: {
  //     border: '1px solid black',
  //     height: '200px',
  //     width: '200px',
  //     cursor: 'pointer',
  //   },
  //   start: {
  //     border: '1px solid black',
  //     height: '200px',
  //     width: '180px',
  //   },
  // };

  // text - decoration: 'none',
  //   border: '2px solid #010100',
  //     padding: '15px',
  //       color: '#000',
  //         textTransform: 'uppercase',
  //           letterSpacing: '2px',
  //             position: 'relative',
  //               display: 'inline-block',

  return (
    <Grid container justifyContent="center" alignItems="center" flexGrow={1} gap={5} height="100%" direction={{ xs: 'column', md: 'row' }}>
      <Grid item onClick={openDialog}>
        {/* <RocketLaunchIcon style={styles.icon} /> */}
        <HomeButton title="Create Today" />
      </Grid>
      <HomeDialog open={open} handleClose={handleClose} />
    </Grid>
  );
}
