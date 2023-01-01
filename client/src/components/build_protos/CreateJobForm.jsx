import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import { Box, Typography, Tooltip, Button, Paper, TextField, Switch, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from 'react';
import ColorPicker from './ColorPicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function AddNewJob({ setNewProtoJobs, cardColor, setColor }) {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobTimer, setJobTimer] = useState('')

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  // const [color, setColor] = useState({
  //   r: '255',
  //   g: '255',
  //   b: '255',
  //   a: '1',
  // })

  const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker)
  }
  const changeColor = (color, event) => {
    setColor(color.rgb)
  }

  const cancelAllFields = () => {
    setJobTitle('')
    setJobDesc('')
    setJobTimer('')
    setDisplayColorPicker(false)
    setColor({
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    })
  }

  const createJob = () => {
    const newJob = {
      title: jobTitle,
      description: jobDesc,
      timer: jobTimer,
      cardColor: cardColor,
      isComplete: false,
      isHidden: false,
    }
    setNewProtoJobs(prevState => [...prevState, newJob])
    cancelAllFields()
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          display: 'flex',
          gap: 2,
          padding: 2,
          background: `linear-gradient(135deg, rgba(${cardColor.r}, ${cardColor.g}, ${cardColor.b}, ${cardColor.a}), rgba(255,255,255) 20%)`,
          border: `1px solid rgba(${cardColor.r}, ${cardColor.g}, ${cardColor.b}, ${cardColor.a})`
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}>
          <ColorizeOutlinedIcon onClick={toggleColorPicker} sx={{
            // color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            fontSize: '30px'
          }} />
          <ColorPicker displayColorPicker={displayColorPicker} changeColor={changeColor} color={cardColor} />
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
              color="neutral"
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Description"
              multiline
              fullWidth
              variant="standard"
              value={jobDesc}
              color={"neutral"}
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
              color="neutral"
              sx={{
                padding: 0,
                margin: 0,
              }}>
              Create
            </Button>
            <Button
              onClick={cancelAllFields}
              color="neutral"
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

          <TextField
            type='number'
            max={60}
            id="standard-basic"
            label="Timer"
            variant="standard"
            value={jobTimer}
            onChange={(e) => setJobTimer(+e.target.value)}
            color="neutral"
            sx={{ maxWidth: 100 }}
          />
        </Box>
      </Paper>
    </ThemeProvider>
  )
}