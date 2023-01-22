import { useState } from 'react';
import ActiveTimer from './ActiveTimer';
import { Box, Typography, Tooltip, Paper, } from "@mui/material"
import activeProtoServices from '../../services/activeProtoServices';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import HelpIcon from '@mui/icons-material/Help';

export default function JobCard({ job, listId, protoId }) {
  const [timer, setTimer] = useState(false)
  const [complete, setComplete] = useState(job.isComplete)
  const [hidden, setHidden] = useState(job.isHidden) // intial state should be job.isHidden



  const handleTimer = () => {
    setTimer(!timer)
  }
  const toggleJobComplete = async () => {
    try {
      setComplete(!complete)
      await activeProtoServices.toggleJobComplete(
        listId,
        {
          protoId: protoId,
          jobId: job._id,
          isComplete: complete
        })
    } catch (error) {
      console.log('In toggleJobComplete', error)
    }
  }

  const setJobHidden = async () => {
    try {
      setHidden(true)
      await activeProtoServices.setJobHidden(
        listId,
        {
          protoId: protoId,
          jobId: job._id,
          isHidden: true
        })
    } catch (error) {
      console.log('In setJobHidden', error)
    }
  }

  const tempColorCard = `rgba(${job.cardColor.r}, ${job.cardColor.g}, ${job.cardColor.b}, ${job.cardColor.a})`

  return (
    <div style={{
      display: hidden ? 'none' : null,
      textDecoration: complete ? 'line-through' : null,
      opacity: complete ? 0.4 : null,

    }}>
      <Paper sx={{
        display: 'flex',
        gap: 2,
        padding: 1,
        // background: `linear-gradient(135deg, ${tempColorCard} 10%, #fff 80%)` || null
        // boxShadow: `2px 2px 0  rgba(0,0,0,0.4)`,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          {!timer ? <PlayCircleIcon fontSize='large' onClick={handleTimer} /> : <StopCircleIcon fontSize='large' onClick={handleTimer} sx={{ color: 'red' }} />}
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: 2,

        }}>
          <Box>
            <Typography sx={{
              fontWeight: 'bold'

            }}>
              {job.title}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}>
            <Typography
              variant='caption'
              fontWeight={500}
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer', }}
              onClick={setJobHidden}
            >
              Hide
            </Typography>
            <Typography
              variant='caption'
              fontWeight={500}
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
            >
              Reset
            </Typography>
            <Typography
              variant='caption'
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
          alignItems: 'center'
        }}>
          <Tooltip title={job.description} placement="top-end">
            <HelpIcon />
          </Tooltip>
          <ActiveTimer jobTimer={job.timer} timerState={timer} />
        </Box>
      </Paper>
    </div >
  )
}