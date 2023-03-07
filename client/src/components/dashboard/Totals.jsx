import { Grid } from '@mui/material';
import StatsCard from './StatsCard';
import StreakCard from './StreakCard';

function Totals({ userStats }) {
  const totalProtosCompleted = userStats
    && userStats.totalProtosCompleted
      .reduce((a, b) => a + b.timesCompleted, 0);
  const totalJobsCompleted = userStats
    && userStats.totalJobsCompleted
      .reduce((a, b) => a + b.timesCompleted, 0);

  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      item
      xs={12}
      md={4}
    >
      <Grid container direction="column" item xs={12} md={3} gap={5}>
        <StatsCard
          stat={totalProtosCompleted}
          background="rgba(255, 99, 132, 1)"
          title="Protos Completed"
        />
        <StatsCard
          stat={totalJobsCompleted}
          background="rgba(53, 162, 235, 1)"
          title="Jobs Completed"
        />
      </Grid>
      <Grid container item direction="column" xs={12} md={6}>
        <StreakCard
          stat={userStats && userStats.dayStreak.streak}
        />
      </Grid>
      <Grid container direction="column" item xs={12} md={3} gap={5}>
        <StatsCard
          stat={userStats && userStats.daysWorked}
          background="#4c49ea"
          title="Days Working"
        />
        <StatsCard
          stat="0"
          background="#952aff"
          title="Time On Task"
        />
      </Grid>
    </Grid>
  );
}

export default Totals;
