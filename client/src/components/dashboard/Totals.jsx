import { Grid, Typography } from '@mui/material';
import StatsCard from './StatsCard';

function Totals({ userStats }) {
  const totalProtosCompleted = userStats
    && userStats.totalProtosCompleted
      .reduce((a, b) => a + b.timesCompleted, 0);
  const totalJobsCompleted = userStats
    && userStats.totalJobsCompleted
      .reduce((a, b) => a + b.timesCompleted, 0);
  return (
    <Grid
      item
      container
      justifyContent="center"
      gap={8}
    >
      <Grid
        item
        xs={12}
        sx={{
          background: '#1f2937',
          borderRadius: '5px',
          padding: 2,
          boxShadow: '0 0 5px 0 #1f2937',
          transition: 'background 0.5s ease-in-out',
          '&:hover': {
            background: '#1f29372e',
          },
        }}
      >
        <Grid>
          <Typography
            textAlign="center"
            variant="h1"
          >
            {userStats && userStats.dayStreak.streak}
          </Typography>
          <Typography
            textAlign="center"
            variant="body2"

          >
            Day Streak
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" gap={2}>
        <StatsCard
          stat={totalProtosCompleted}
          title="Protos Complete"
        />
        <StatsCard
          stat={totalJobsCompleted}
          title="Jobs Complete"
        />
        <StatsCard
          stat={userStats && userStats.daysWorked}
          title="Proto Days"
        />
        <StatsCard
          stat="0"
          title="Proto Time"
        />

      </Grid>
    </Grid>

  // <Grid
  //   container
  //   spacing={5}
  //   alignItems="center"
  //   item
  //   xs={12}
  //   md={4}
  // >
  //   <Grid container direction="column" item xs={12} md={3} gap={5}>
  //     <StatsCard
  //       stat={totalProtosCompleted}
  //       background="rgba(255, 99, 132, 1)"
  //       title="Protos Completed"
  //     />
  //     <StatsCard
  //       stat={totalJobsCompleted}
  //       background="rgba(53, 162, 235, 1)"
  //       title="Jobs Completed"
  //     />
  //   </Grid>
  //   <Grid container item direction="column" xs={12} md={6}>
  //     <StreakCard
  //       stat={userStats && userStats.dayStreak.streak}
  //     />
  //   </Grid>
  //   <Grid container direction="column" item xs={12} md={3} gap={5}>
  //     <StatsCard
  //       stat={userStats && userStats.daysWorked}
  //       background="#4c49ea"
  //       title="Days Working"
  //     />
  //     <StatsCard
  //       stat="0"
  //       background="#952aff"
  //       title="Time On Task"
  //     />
  //   </Grid>
  // </Grid>
  );
}

export default Totals;
