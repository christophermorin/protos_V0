import { TextField, Autocomplete, Button, createFilterOptions, Slider, Switch, FormGroup, FormControlLabel, Box, Typography } from "@mui/material"
import { useState } from "react"

export default function JobInput({ setnewCreatedJobs, listAllJobs, setListAllJobs, setNewProtoJobs }) {
  const [value, setValue] = useState('') // This state is only used here
  const [description, setDescription] = useState('')
  const [notification, setNotification] = useState(false)
  const [timerChecked, setTimerChecked] = useState(false)
  const [timerValue, setTimerValue] = useState('')

  const filter = createFilterOptions()

  const addJobToDB = () => {
    if (!value) {
      console.log('enter a title')
      return
    }
    const jobExists = listAllJobs.find(prevJob => prevJob.title === value.title)
    if (!jobExists) {
      const newJob = {
        title: value,
        description: description,
        timer: Number(timerValue) || null,
        notification: notification,
        isComplete: false
      }
      setNewProtoJobs(prevState => [...prevState, newJob])
      setnewCreatedJobs(prevState => [...prevState, newJob])
      setListAllJobs(prevState => [...prevState, newJob])
      setValue('')
      setDescription('')
      setNotification(false)
      setTimerChecked(false)
      setTimerValue('')
    }
    else {
      setNewProtoJobs(prevState => [...prevState, {
        title: value.title,
        description: description || value.description,
        timer: Number(timerValue) || value.timer,
        notification: notification || value.notification,
        isComplete: false
      }])
    }
  }

  const marks = [
    {
      value: 0,
      label: 'Normal'
    },
    {
      value: 50,
      label: 'Medium'
    },
    {
      value: 100,
      label: 'Critical'
    },

  ]
  console.log(value)
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 300
    }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue)
          if (typeof newValue === 'string') {
            setValue({
              title: newValue
            });
          }
          else if (newValue && newValue.inputValue) {
            setValue(newValue.inputValue)

          }
          else {
            setValue(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const { inputValue } = params
          const isExsisting = options.some((option) => inputValue === option.title)
          if (inputValue !== '' && !isExsisting) {
            filtered.push({
              inputValue,
              title: `Add ${inputValue}`
            })
          }
          return filtered
        }}

        selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        disablePortal
        id="job-input"
        options={listAllJobs || []}
        sx={{ width: 300 }}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.title;
          }
          // Regular option


          return option.title;
        }}
        freeSolo
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        renderInput={(params) => <TextField name="proto_job" label="Job Title" {...params} required />}
      />

      <Typography sx={{
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold',
        margin: 0
      }}>
        Search from pre-existing jobs or create your own
      </Typography>

      <TextField name='description' label="Description" value={description} onChange={(e) => setDescription(e.target.value)}></TextField>

      <Typography sx={{
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold',
        margin: 0
      }}>
        Optional: Describe how to carry out this job
      </Typography>

      <Slider
        aria-label="Importance"
        defaultValue={50}
        // getAriaValueText={valuetext}
        // valueLabelDisplay="auto"
        step={50}
        marks={marks}
        min={0}
        max={100}
        sx={{
          width: 200,
          alignSelf: 'center'
        }}
      />
      <FormGroup>
        <FormControlLabel control={<Switch />} checked={notification} onChange={() => setNotification(!notification)} label="Set Reminder" />
        <Typography sx={{
          fontSize: 11,
          color: 'grey',
          fontWeight: 'bold',
          margin: 0
        }}>
          Have Protos remind you of an upcoming job
        </Typography>
        <FormControlLabel control={<Switch />} checked={timerChecked} label="Timer" onChange={() => setTimerChecked(!timerChecked)} />
        <Typography sx={{
          fontSize: 11,
          color: 'grey',
          fontWeight: 'bold',
          margin: 0
        }}>
          Set the total time you would like to work on this job
        </Typography>
      </FormGroup>
      {timerChecked &&
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10
        }}>
          <TextField
            value={timerValue}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: 100 }}
            onChange={(e) => setTimerValue(e.target.value)} />
          <span>min</span>
        </div>
      }

      <Button onClick={addJobToDB} variant="contained">Add Job</Button>
    </Box>
  )
}