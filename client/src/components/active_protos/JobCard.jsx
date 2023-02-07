import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Typography, Tooltip, Paper, Grid,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import HelpIcon from '@mui/icons-material/Help';
import ActiveTimer from './ActiveTimer';
import activeProtoServices from '../../services/activeProtoServices';
import { displayedUpdateList } from '../../reducers/displayedProtosReducer';
import { setActiveProtos } from '../../reducers/activeProtosReducer';

function JobCard({ job, listId, protoId }) {
  const [timer, setTimer] = useState(false);
  const [complete, setComplete] = useState(job.isComplete);
  const [hidden, setHidden] = useState(job.isHidden); // intial state should be job.isHidden
  const dispatch = useDispatch();
  const handleTimer = () => {
    setTimer(!timer);
  };
  const toggleJobComplete = async () => {
    try {
      setComplete(!complete);
      const result = await activeProtoServices.toggleJobComplete(
        listId,
        {
          protoId,
          jobId: job._id,
          isComplete: complete,
        },
      );
      const updatedProto = result.activeProtos.find((proto) => proto._id === protoId);
      dispatch(displayedUpdateList(updatedProto));
      dispatch(setActiveProtos(result));
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

  // const tempColorCard = `
  //   rgba(${job.cardColor.r},
  //   ${job.cardColor.g},
  //   ${job.cardColor.b},
  //   ${job.cardColor.a})`

  return (
    <Paper sx={{
      padding: 1,
      textDecoration: complete ? 'line-through' : null,
      opacity: complete ? 0.4 : null,
      // background: `linear-gradient(135deg, ${tempColorCard} 10%, #fff 80%)` || null
      // boxShadow: `2px 2px 0  rgba(0,0,0,0.4)`,
    }}
    >
      <Grid container height="100%" alignItems="center">
        <Grid container item xs={2}>
          {!timer ? <PlayCircleIcon fontSize="large" onClick={handleTimer} /> : <StopCircleIcon fontSize="large" onClick={handleTimer} sx={{ color: 'red' }} />}
        </Grid>
        <Grid item xs={8}>
          <Grid item>
            <Typography fontWeight={700}>
              {job.title}
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction="row"
            maxWidth="90%"
            justifyContent="space-between"
            marginTop={1}>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
              onClick={deleteJob}
            >
              Delete
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
            >
              Reset
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ '&:hover': { color: 'green' }, cursor: 'pointer' }}
              onClick={toggleJobComplete}
            >
              Complete
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-end"
          xs={2}
          gap={1}>
          <Tooltip title={job.description} placement="top-end">
            <HelpIcon />
          </Tooltip>
          <ActiveTimer jobTimer={job.timer} timerState={timer} />
        </Grid>
      </Grid>
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
