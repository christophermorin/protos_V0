import { useState } from 'react';
import { Grid } from '@mui/material';
import HomeDialog from './HomeDialog';
import HomeButton from '../buttons/HomeButton';
import Notification from '../notifications/Notification';

export default function Home() {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      gap={5}
      height="100%"
      direction={{ xs: 'column', md: 'row' }}
    >
      <Grid
        item
        onClick={openDialog}
      >
        <HomeButton
          title="Create Today"
        />
      </Grid>
      <HomeDialog
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
}
