import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Typography, Tooltip, Paper,
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
    <div style={{
      display: hidden ? 'none' : null,
      textDecoration: complete ? 'line-through' : null,
      opacity: complete ? 0.4 : null,

    }}
    >
      <Paper sx={{
        display: 'flex',
        gap: 2,
        padding: 1,
        // background: `linear-gradient(135deg, ${tempColorCard} 10%, #fff 80%)` || null
        // boxShadow: `2px 2px 0  rgba(0,0,0,0.4)`,
      }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
          {!timer ? <PlayCircleIcon fontSize="large" onClick={handleTimer} /> : <StopCircleIcon fontSize="large" onClick={handleTimer} sx={{ color: 'red' }} />}
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: 2,

        }}
        >
          <Box>
            <Typography sx={{
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
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Tooltip title={job.description} placement="top-end">
            <HelpIcon />
          </Tooltip>
          <ActiveTimer jobTimer={job.timer} timerState={timer} />
        </Box>
      </Paper>
    </div>
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
