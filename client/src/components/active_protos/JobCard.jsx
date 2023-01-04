import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import HelpIcon from '@mui/icons-material/Help';
import { Box, Typography, Tooltip, Button, Paper, TextField, Grid } from "@mui/material"
import axios from 'axios'

import ActiveTimer from './ActiveTimer';
import { useState } from 'react';

export default function JobCard({ job, protoId }) {
  const [toolTip, setToolTip] = useState(false)
  const [timer, setTimer] = useState(false)
  const [complete, setComplete] = useState(job.isComplete)
  const [hidden, setHidden] = useState(false) // intial state should be job.isHidden

  const handleTimer = () => {
    setTimer(!timer)
  }

  const markComplete = async () => {
    setComplete(!complete)
    console.log(job._id)
  }

  const hideJob = async () => {
    setHidden(!hidden)
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
        background: `linear-gradient(135deg, ${tempColorCard}, rgba(255,255,255) 20%)`,
        border: `1px solid ${tempColorCard}`,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          {!timer ? <PlayCircleIcon fontSize='large' onClick={handleTimer} /> : <StopCircleIcon fontSize='large' onClick={handleTimer} />}
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
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer', }}
              onClick={hideJob}
            >
              Hide
            </Typography>
            <Typography
              variant='caption'
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
            >
              Reset
            </Typography>
            <Typography
              variant='caption'
              sx={{ '&:hover': { color: 'green' }, cursor: 'pointer' }}
              onClick={markComplete}
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
            <HelpIcon onClick={() => setToolTip(!toolTip)} />
          </Tooltip>
          <ActiveTimer jobTimer={job.timer} timerState={timer} />
        </Box>
      </Paper>
    </div>
  )
}