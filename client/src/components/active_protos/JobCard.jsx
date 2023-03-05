import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
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
      sx={{
        borderRadius: '5px',
        // background: `linear-gradient(135deg, ${tempColorCard}, transparent 20%)`,
      }}
    >
      <Box
        sx={{
          padding: 1,
          borderRadius: '5px',
          cursor: 'pointer',
          opacity: complete ? 0.4 : null,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '& .jobBackGround': {
              transform: 'scale(3)',
            },
          },
        }}
      >
        <div
          style={{
            height: '158px',
            width: '158px',
            background: `linear-gradient(135deg, ${tempColorCard}, transparent 90%)`,
            zIndex: '1',
            position: 'absolute',
            top: '-75px',
            left: '-75px',
            borderRadius: '75%',
            transition: 'all 1s ease-in-out',
          }}
          className="jobBackGround"
        />
        <Grid container height="100%" alignItems="center">
          <Grid item xs={10} zIndex={1}>
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
              justifyContent="space-evenly"
              marginTop={1}
            >
              <Typography
                variant="caption"
                sx={{ '&:hover': { color: 'red' } }}
                onClick={deleteJob}
              >
                Delete
              </Typography>
              <Typography
                variant="caption"
              >
                Reset
              </Typography>
              {complete
                ? (
                  <Typography
                    variant="caption"
                    onClick={toggleJobComplete}
                    sx={{ '&:hover': { color: 'red' } }}
                  >
                    Incomplete
                  </Typography>
                )
                : (
                  <Typography
                    variant="caption"
                    onClick={toggleJobComplete}
                    sx={{ '&:hover': { color: 'green' } }}
                  >
                    Complete
                  </Typography>
                )}
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
            {!timer ? <PlayCircleIcon fontSize="medium" onClick={handleTimer} /> : <StopCircleIcon fontSize="medium" onClick={handleTimer} sx={{ color: 'red' }} />}
            {/* <Tooltip title={job.description} placement="top-end">
              <HelpIcon />
            </Tooltip> */}
            <ActiveTimer jobTimer={job.timer} timerState={timer} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
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
