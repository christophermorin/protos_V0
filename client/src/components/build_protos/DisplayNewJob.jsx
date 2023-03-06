import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Box,
  Typography,
  Tooltip,
  Paper,
  Grid,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ActiveTimer from '../active_protos/ActiveTimer';

function DisplayNewJob({ job, deleteJob }) {
  const colorChoice = `rgba(
    ${job.cardColor.r}, 
    ${job.cardColor.g}, 
    ${job.cardColor.b}, 
    ${job.cardColor.a}
    )`;
  return (

    <Paper
      sx={{
        // padding: 1,
        // background: `linear-gradient(135deg, ${colorChoice}, transparent 90%)`,
        // borderBottom: `0.2px solid ${colorChoice}`,
        // borderLeft: `5px solid ${colorChoice}`
      }}
    >
      <Box
        sx={{
          background: 'rgba(76, 98, 126, 0.2)',
          padding: 1,
          borderRadius: '5px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '& .displayJobBackGround': {
              transform: 'scale(0.8)',
            },
          },
        }}
      >
        <div
          className="displayJobBackGround"
          style={{
            height: '258px',
            width: '280px',
            background: `linear-gradient(135deg, ${colorChoice}, transparent 90%)`,
            zIndex: '1',
            position: 'absolute',
            top: '-75px',
            left: '-75px',
            borderRadius: '0 0 75% 0',
            transition: 'all 1s ease-in-out',
            // transform: 'scale(3)',
          }}
        />
        <Grid container>
          {/* <Grid item xs={2} sm={1} display="flex" alignItems="center">
          <PlayCircleIcon fontSize="large" />
        </Grid> */}
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
            <Box display="flex" gap={2} paddingLeft={2} />
          </Grid>
          <Grid item xs={4} sm={1} container justifyContent="flex-end" alignContent="flex-end">
            <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end">
              {/* <Tooltip title={job.description} placement="top-end">
              <HelpIcon />
            </Tooltip> */}
              <Typography
                variant="caption"
                fontWeight={500}
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={() => deleteJob(job.title)}
              >
                Remove
              </Typography>
              <ActiveTimer jobTimer={job.timer} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

DisplayNewJob.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isComplete: PropTypes.bool,
    isHidden: PropTypes.bool,
    timer: PropTypes.number,
    // cardColor: PropTypes.objectOf(PropTypes.string)
  }).isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default DisplayNewJob;
