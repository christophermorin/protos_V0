import { Paper, Typography } from '@mui/material';
import styles from './Dashboard.module.css';

function StreakCard({ stat }) {
  return (
    <Paper
      className={`${styles.streakCard}`}
      sx={{
        background: 'rgba(0,0,0,0.6)',
      }}
    >
      <Typography
        variant="h1"
        fontWeight={700}
        color="#fff"
        position="relative"
        zIndex={2}
        textAlign="center"
      >
        {stat}
      </Typography>
      <Typography
        variant="h5"
        color="#fff"
        position="relative"
        zIndex={2}
        textAlign="center"
      >
        Day Streak!
      </Typography>
    </Paper>
  );
}

export default StreakCard;
