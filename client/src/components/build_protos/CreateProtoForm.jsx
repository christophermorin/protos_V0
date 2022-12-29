import { Box, TextField, Typography, Paper, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, InputLabel, Select, MenuItem, Slider, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { useState } from 'react';

export default function CreateProtoForm({ setProtoTitle, setProtoDescription, protoTitle, protoDescription, handleTimeOfDay, protoTimeOfDay }) {
  // const [timeOfDay, setTimeOfDay] = useState('')

  // const handleTimeOfDay = (event, time) => {
  //   setTimeOfDay(time)
  // }

  return (
    <Paper sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: 1,
      gap: 2,
      padding: 5,
      marginTop: 5,
      maxWidth: 360

    }}>
      <Box>

      </Box>
      <Box>
        <TextField
          id="proto-title"
          label="Title"
          variant="standard"
          value={protoTitle}
          onChange={(e) => setProtoTitle(e.target.value)}
          fullWidth

        />
        <Typography sx={{
          fontSize: 11,
          color: 'grey',
          fontWeight: 'bold',
          margin: 0
        }}>
          Choose a title for your Proto. Short and sweet is best!
        </Typography>
        <TextField
          id="proto-description"
          label="Description"
          variant="standard"
          multiline value={protoDescription}
          onChange={(e) => setProtoDescription(e.target.value)}
          fullWidth
        />
        <Typography sx={{
          fontSize: 11,
          color: 'grey',
          fontWeight: 'bold',
          margin: 0
        }}>
          Describe your Proto. What is it you are trying to achieve? What are the benefits of implementing this Proto into your life?
        </Typography>
      </Box>

      {/* Seperate into new component */}
      <ToggleButtonGroup
        value={protoTimeOfDay}
        exclusive
        onChange={handleTimeOfDay}
        aria-label="text alignment"
        size="small"
      >
        <ToggleButton value="morning" aria-label="morning">
          <Tooltip title='Morning' placement="top-end">
            <WbTwilightIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="afternoon" aria-label="afternoon">
          <Tooltip title='Afternoon' placement="top-end">
            <WbSunnyIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="evening" aria-label="evening">
          <Tooltip title='Evening' placement="top-end">
            <NightlightIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="continuous" aria-label="continuous">
          <Tooltip title='Continuous' placement="top-end">
            <ReplayCircleFilledIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  )
}