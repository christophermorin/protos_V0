import { TextField, Autocomplete, Button, createFilterOptions, Slider, Switch, FormGroup, FormControlLabel, Box } from "@mui/material"
import { useState } from "react"

export default function JobInput({ setnewCreatedJobs, listAllJobs, setListAllJobs, setNewProtoJobs }) {
  const [value, setValue] = useState('') // This state is only used here
  const [description, setDescription] = useState('')
  const [notification, setNotification] = useState(false)

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
        notification: notification,
        isComplete: false
      }
      setNewProtoJobs(prevState => [...prevState, newJob])
      setnewCreatedJobs(prevState => [...prevState, newJob])
      setListAllJobs(prevState => [...prevState, newJob])
      setValue('')
      setDescription('')
      setNotification(false)
    }
    else {
      setNewProtoJobs(prevState => [...prevState, {
        title: value.title,
        description: description || value.description,
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
      gap: 2,
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
      <TextField name='description' label="Description" value={description} onChange={(e) => setDescription(e.target.value)}></TextField>

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
        <FormControlLabel control={<Switch />} label="Timer" />
      </FormGroup>
      <Button onClick={addJobToDB}>Add Job</Button>
    </Box>
  )
}