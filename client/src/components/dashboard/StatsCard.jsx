import { Grid, Typography } from '@mui/material';

function StatsCard({ stat, title }) {
  return (
    <Grid
      item
      xs={12}
      md={2}
      sx={{
        background: '#1f29372e',
        borderRadius: '5px',
        padding: 2,
        boxShadow: '0 0 5px 0 #1f2937',
        transition: 'background 0.5s ease-in-out',
        '&:hover': {
          background: '#1f2937',
        },
      }}
    >
      <Grid>
        <Typography
          variant="h3"
          textAlign="center"
        >
          {stat}
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default StatsCard;
