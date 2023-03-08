import { Grid, Paper } from '@mui/material';
import BarChart from './BarChart';

function Charts({ userStats }) {
  return (
    <Grid
      container
      item
      spacing={5}
      marginTop={2}
      marginBottom={2}
    >
      <Grid item xs={12} md={6}>
        <Paper sx={{
          padding: 2,
          transition: 'background 0.5s ease-in-out',
          '&:hover': {
            background: '#1f2937',
          },
        }}
        >
          <BarChart
            dataSet={userStats ? userStats.totalProtosCompleted : []}
            title="Top Protos"
            color="rgba(255, 99, 132, 1)"
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{
          padding: 2,
          transition: 'background 0.5s ease-in-out',
          '&:hover': {
            background: '#1f2937',
          },
        }}
        >
          <BarChart
            dataSet={userStats ? userStats.totalJobsCompleted : []}
            title="Top Jobs"
            color="rgba(53, 162, 235, 1)"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Charts;
