import { Grid, Paper } from '@mui/material';
import BarChart from './BarChart';
import styles from './Dashboard.module.css';

function Charts({ userStats }) {
  return (
    <Grid container item spacing={5} xs={12} md={4} marginTop={2} marginBottom={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{
          padding: 2,
          '&:hover': {
            boxShadow: '0 0 2px 2px rgba(0,0,0,0.2)',
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
          '&:hover': {
            boxShadow: '0 0 2px 2px rgba(0,0,0,0.2)',
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
