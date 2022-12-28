import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { Box, Typography, Tooltip, Button, Paper, TextField, Switch, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from 'react';


export default function AddNewJob({ setNewProtoJobs }) {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobTimer, setJobTimer] = useState('')

  const cancelAllFields = () => {
    setJobTitle('')
    setJobDesc('')
    setJobTimer('')
  }

  const createJob = () => {
    const newJob = {
      title: jobTitle,
      description: jobDesc,
      timer: jobTimer
    }
    setNewProtoJobs(prevState => [...prevState, newJob])
    cancelAllFields()
  }
  return (
    <Paper sx={{
      display: 'flex',
      maxWidth: 360,
      gap: 2,
      padding: 2,
      border: '1px dashed grey'
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
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Description"
            multiline
            fullWidth
            variant="standard"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center'
        }}>
          <Button
            onClick={createJob}
            sx={{
              padding: 0,
              margin: 0,
            }}>
            Create
          </Button>
          <Button
            onClick={cancelAllFields}
            sx={{
              padding: 0,
              margin: 0
            }}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Tooltip title='Description' placement="top-end">
          <Button>Extras</Button>
        </Tooltip>
        {/* <FormGroup>
            <FormControlLabel control={<Switch />} label="Reminder" labelPlacement='top'>
            </FormControlLabel>
          </FormGroup> */}
        {/* <Switch label="Notification" /> */}
        <TextField
          type='number'
          id="standard-basic"
          label="Timer"
          variant="standard"
          value={jobTimer}
          onChange={(e) => setJobTimer(+e.target.value)}
          sx={{ maxWidth: 100 }}
        />
      </Box>
    </Paper>
  )
}