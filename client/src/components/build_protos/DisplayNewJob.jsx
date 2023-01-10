import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { Box, Typography, Tooltip, Button, Paper } from "@mui/material"
import HelpIcon from '@mui/icons-material/Help';
import ActiveTimer from '../active_protos/ActiveTimer';

// Replace sx styling

export default function DisplayNewJob({ job, deleteJob }) {
  const colorChoice = `rgba(${job.cardColor.r}, ${job.cardColor.g}, ${job.cardColor.b}, ${job.cardColor.a})`
  return (

    <Paper sx={{
      display: 'flex',
      gap: 2,
      padding: 2,
      background: `linear-gradient(135deg, ${colorChoice}, rgba(255,255,255) 20%)`,
      border: `1px solid ${colorChoice}`
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
          <Typography
            sx={{
              fontWeight: 'bold'
            }}
          >{job.title}</Typography>
        </Box>
        <Box>
          <Button
            onClick={() => deleteJob(job.title)}
            sx={{
              padding: 0,
              margin: 0,
              minWidth: 0,
              textTransform: 'none'
            }}>
            Delete
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

      }}>
        <Tooltip title={job.description} placement="top-end">
          <HelpIcon />
        </Tooltip>
        <ActiveTimer jobTimer={job.timer} />
      </Box>
    </Paper>
  )
}