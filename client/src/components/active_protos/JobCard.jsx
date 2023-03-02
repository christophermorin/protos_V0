import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Typography, Tooltip, Paper, Grid,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import HelpIcon from '@mui/icons-material/Help';
import { useTheme } from '@mui/material/styles';
import ActiveTimer from './ActiveTimer';
import activeProtoServices from '../../services/activeProtoServices';
import userStatsServices from '../../services/userStatsServices';
import { displayedUpdateList } from '../../reducers/displayedProtosReducer';
import { setActiveProtos } from '../../reducers/activeProtosReducer';

function JobCard({
  job, listId, protoId, userId,
}) {
  const [timer, setTimer] = useState(false);
  const [complete, setComplete] = useState(job.isComplete);
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleTimer = () => {
    setTimer(!timer);
  };
  const toggleJobComplete = async () => {
    try {
      setComplete(!complete);
      const updatedActiveList = await activeProtoServices.toggleJobComplete(
        listId,
        {
          protoId,
          jobId: job._id,
          isComplete: !complete,
        },
      );
      const updatedProto = updatedActiveList.activeProtos.find((proto) => proto._id === protoId);
      dispatch(displayedUpdateList(updatedProto));
      dispatch(setActiveProtos(updatedActiveList));
      const updateStatsJobs = await userStatsServices.updateStatsJobsCompleted(userId, {
        title: job.title,
        isComplete: !complete,
      });
    } catch (error) {
      console.log('In toggleJobComplete', error);
    }
  };

  const deleteJob = async () => {
    try {
      const result = await activeProtoServices.deleteJob(
        listId,
        {
          protoId,
          jobId: job._id,
        },
      );
      const updatedProto = result.activeProtos.find((proto) => proto._id === protoId);
      dispatch(displayedUpdateList(updatedProto));
      dispatch(setActiveProtos(result));
    } catch (error) {
      console.log('In deleteJob', error);
    }
  };

  const tempColorCard = `
    rgba(${job.cardColor.r},
    ${job.cardColor.g},
    ${job.cardColor.b},
    ${job.cardColor.a})`;

  return (
    <Paper
      sx={{ background: '#fff', borderRadius: '5px' }}
    >
      <Box
        sx={{
          padding: 1,
          cursor: 'pointer',
          opacity: complete ? 0.4 : null,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '& .jobBackGround': {
              transform: 'scale(10)',
            },
          },
        }}
      >
        <div
          style={{
            height: '118px',
            width: '90px',
            background: tempColorCard,
            zIndex: '1',
            position: 'absolute',
            top: '-25px',
            left: '-75px',
            borderRadius: '75%',
            transition: 'all 0.3s ease',
          }}
          className="jobBackGround"
        />
        <Grid container height="100%" alignItems="center">
          <Grid container item xs={2} zIndex={1}>
            {!timer ? <PlayCircleIcon fontSize="large" onClick={handleTimer} /> : <StopCircleIcon fontSize="large" onClick={handleTimer} sx={{ color: 'red' }} />}
          </Grid>
          <Grid item xs={8} zIndex={1}>
            <Grid item>
              <Typography fontWeight={700} sx={{ textDecoration: complete ? 'line-through 2px black' : null }}>
                {job.title}
              </Typography>
            </Grid>
            <Grid
              container
              item
              direction="row"
              maxWidth="90%"
              justifyContent="space-between"
              marginTop={1}
            >
              <Typography variant="caption" sx={{ '&:hover': { color: 'red' } }} onClick={deleteJob}>Delete</Typography>
              <Typography variant="caption">Reset</Typography>
              {complete ?
                < Typography variant="caption" onClick={toggleJobComplete} sx={{ '&:hover': { color: 'red' } }}>Incomplete</Typography>
                :
                < Typography variant="caption" onClick={toggleJobComplete} sx={{ '&:hover': { color: 'green' } }}>Complete</Typography>

              }
              {/* <Typography variant="caption" onClick={toggleJobComplete}>Complete</Typography> */}
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="flex-end"
            xs={2}
            gap={1}
            zIndex={1}
          >
            <Tooltip title={job.description} placement="top-end">
              <HelpIcon />
            </Tooltip>
            <ActiveTimer jobTimer={job.timer} timerState={timer} />
          </Grid>
        </Grid>
      </Box>
    </Paper >
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isComplete: PropTypes.bool,
    isHidden: PropTypes.bool,
    timer: PropTypes.number,
    // cardColor: PropTypes.objectOf(PropTypes.string)
  }).isRequired,
  listId: PropTypes.string.isRequired,
  protoId: PropTypes.string.isRequired,
};

export default JobCard;
