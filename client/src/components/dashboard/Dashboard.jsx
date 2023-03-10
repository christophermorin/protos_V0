import { useEffect, useState } from 'react';
import {
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import userStatsServices from '../../services/userStatsServices';
import Totals from './Totals';
import Charts from './Charts';

function Dashboard() {
  const [userStats, setUserStats] = useState(null);
  const user = useSelector((state) => state.userAuth);
  useEffect(() => {
    const getUserStats = async () => {
      const stats = await userStatsServices.getUserStats(user.id);
      setUserStats(stats);
    };
    getUserStats();
  }, []);
  const totalProtosCompleted = userStats
    && userStats.totalProtosCompleted.reduce((a, b) => a + b.timesCompleted, 0);
  const totalJobsCompleted = userStats
    && userStats.totalJobsCompleted.reduce((a, b) => a + b.timesCompleted, 0);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      spacing={8}
      paddingTop={2}
      paddingBottom={2}
      height="100%"
      wrap="nowrap"
    >
      <Totals userStats={userStats} />
      <Charts userStats={userStats} />
    </Grid>
  );
}

export default Dashboard;
