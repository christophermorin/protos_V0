import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import HelpIcon from '@mui/icons-material/Help';
import { Box, Typography, Tooltip, Button, Paper, TextField } from "@mui/material"

import ActiveTimer from './ActiveTimer';
import { useState } from 'react';

export default function JobCard({ job }) {
  const [toolTip, setToolTip] = useState(false)
  const [timer, setTimer] = useState(false)

  const handleTimer = () => {
    setTimer(!timer)
  }






  const tempColorCard = `rgba(${job.cardColor.r}, ${job.cardColor.g}, ${job.cardColor.b}, ${job.cardColor.a})`

  return (
    <div>
      <Paper sx={{
        display: 'flex',
        maxWidth: 360,
        gap: 2,
        padding: 1,
        background: `linear-gradient(135deg, ${tempColorCard}, rgba(255,255,255) 20%)`,
        border: `1px solid ${tempColorCard}`

      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          {!timer ? <PlayCircleIcon fontSize='large' onClick={handleTimer} /> : <StopCircleIcon fontSize='large' onClick={handleTimer} />}
          {/* <PlayCircleIcon fontSize='large' onClick={handleTimer} /> */}
          {/* <StopCircleIcon fontSize='large' onClick={handleTimer} /> */}
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          gap: 2
        }}>
          <Box>
            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
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
              variant='subtitle2'
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
            >
              Delete
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ '&:hover': { color: 'red' }, cursor: 'pointer' }}
            >
              Reset
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ '&:hover': { color: 'green' }, cursor: 'pointer' }}
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