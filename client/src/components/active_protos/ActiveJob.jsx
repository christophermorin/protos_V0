import { Accordion, AccordionSummary, AccordionDetails, Typography, Avatar, IconButton, Tooltip, Box } from "@mui/material"
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ActiveTimer from "./ActiveTimer";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function ActiveJob({ job }) {





  return (
    <Accordion>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Avatar sx={{ width: 24, height: 24, marginRight: 2 }}>
          <StarBorderPurple500Icon />
        </Avatar>
        <Typography>{job.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {job.description}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{
            display: 'flex'
          }}>
            <ActiveTimer />
            <PlayArrowIcon />
            <StopIcon />
            <RestartAltIcon />
          </Box>
          <Tooltip title="Complete">
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}



{/* <Box sx={{
  display: 'flex',
  justifyContent: 'flex-end'
}}>
  <Tooltip title="Delete">
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
  <Tooltip title="Complete">
    <IconButton>
      <CheckCircleIcon />
    </IconButton>
  </Tooltip>
</Box> */}