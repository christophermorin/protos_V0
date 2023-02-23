import { Grid, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Grid container>
      <Grid item xs={12} md="auto" marginTop={{ xs: 0, md: 10 }} marginLeft={{ xs: 0, md: 25 }} marginRight={{ xs: 0, md: 2 }} marginBottom={2}>
        <Typography>
          Dashboard testing
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
