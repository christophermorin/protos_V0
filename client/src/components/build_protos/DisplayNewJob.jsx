import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { Box, Typography, Tooltip, Button, Paper, TextField, Switch, FormControlLabel, FormGroup } from "@mui/material"
import HelpIcon from '@mui/icons-material/Help';
import ActiveTimer from '../active_protos/ActiveTimer';


export default function DisplayNewJob({ job, deleteJob }) {

  return (
    <div>
      <Paper sx={{
        display: 'flex',
        maxWidth: 360,
        gap: 2,
        padding: 2
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}>
            <Button
              onClick={() => deleteJob(job.title)}
              sx={{
                padding: 0,
                margin: 0,
              }}>
              Delete
            </Button>
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
          {/* <FormGroup>
            <FormControlLabel control={<Switch />} label="Reminder" labelPlacement='top'>
            </FormControlLabel>
          </FormGroup> */}
          {/* <Switch label="Notification" /> */}
          <ActiveTimer timer={job.timer} />
        </Box>
      </Paper>
    </div>
  )
}