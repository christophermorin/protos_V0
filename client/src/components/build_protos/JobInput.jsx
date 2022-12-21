import { TextField, Autocomplete, Button, createFilterOptions } from "@mui/material"
import { useState } from "react"

export default function JobInput({ setTempJobs, listAllJobs }) {
  const [value, setValue] = useState(null) // This state is only used here

  const filter = createFilterOptions()

  const addJobToDB = () => {
    console.log(value)
    const jobExists = listAllJobs.find(prevJob => prevJob.title === value.title)
    if (!jobExists) {
      console.log('added it')
      setTempJobs(prevState => [...prevState, { title: value }])
    }
  }

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
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
        options={listAllJobs}
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
        renderInput={(params) => <TextField name="proto_job" {...params} />}
      />
      <Button onClick={addJobToDB}>Add Job</Button>
    </div>
  )
}