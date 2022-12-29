import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Typography, Tooltip, Button, Paper, TextField } from "@mui/material"

import ActiveTimer from './ActiveTimer';
import { useState } from 'react';
export default function JobCard({ job }) {
  const [toolTip, setToolTip] = useState(false)

  const tempColorCard = `rgba(${job.cardColor.r}, ${job.cardColor.g}, ${job.cardColor.b}, ${job.cardColor.a})`

  return (
    <div>
      <Paper sx={{
        display: 'flex',
        maxWidth: 360,
        gap: 2,
        padding: 2,
        background: `linear-gradient(135deg, ${tempColorCard}, rgba(255,255,255) 20%)`,
        border: `1px solid ${tempColorCard}`

      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <StarBorderPurple500Icon />
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
            gap: 5,
            alignItems: 'center'
          }}>
            <Typography>Delete</Typography>
            <Typography>Complete</Typography>
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
          <ActiveTimer timer={job.timer} />
        </Box>
      </Paper>
    </div>
  )
}