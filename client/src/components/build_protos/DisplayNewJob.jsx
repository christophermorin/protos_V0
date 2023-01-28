import HelpIcon from '@mui/icons-material/Help';
import {
  Box, Typography, Tooltip, Paper, Grid,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ActiveTimer from '../active_protos/ActiveTimer';

// Replace sx styling

export default function DisplayNewJob({ job, deleteJob }) {
  const colorChoice = `rgba(${job.cardColor.r}, ${job.cardColor.g}, ${job.cardColor.b}, ${job.cardColor.a})`;
  return (

    <Paper sx={{
      padding: 1,
      background: `linear-gradient(135deg, ${colorChoice}, rgba(255,255,255) 20%)`,
      border: '1px solid black',
    }}
    >
      <Grid container>
        <Grid item xs={2} sm={1} display="flex" alignItems="center">
          <PlayCircleIcon fontSize="large" />
        </Grid>
        <Grid container item xs={8} sm={10} direction="column" gap={2}>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              {job.title}
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ color: 'red', cursor: 'pointer' }}
              onClick={() => deleteJob(job.title)}
            >
              Delete
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ cursor: 'not-allowed' }}
            >
              Reset
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ cursor: 'not-allowed' }}
            >
              Complete
            </Typography>

          </Box>
        </Grid>
        <Grid item xs={2} sm={1}>
          <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end">
            <Tooltip title={job.description} placement="top-end">
              <HelpIcon />
            </Tooltip>
            <ActiveTimer jobTimer={job.timer} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
