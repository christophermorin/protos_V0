import { Paper, Typography } from '@mui/material';
import styles from './Dashboard.module.css';

function StatsCard({ stat, background, title }) {
  return (
    <Paper
      className={`${styles.statsCard}`}
    >
      <div className={styles.statsCardBackground} style={{ background }} />
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
        {title}
      </Typography>
    </Paper>
  );
}

export default StatsCard;
