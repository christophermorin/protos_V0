import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material"
import { useState, useEffect } from 'react'
import axios from 'axios'
import JobInput from "./JobInput"
import JobsList from "./JobsList"

// TODO:
/* 
-Array of jobs when creating new proto is not cleared on clicking 'create proto', creating another sends the previously entered jobs as well.


*/



export default function BuildForm() {
  const [title, setTitle] = useState('') // This state can stay here
  const [description, setDescription] = useState('') // This state can stay here
  const [listAllJobs, setListAllJobs] = useState()

  const [jobFormVisible, setJobFormVisible] = useState(false)

  const [tempJobs, setTempJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      const allJobs = await axios.get('/api/jobs')
      setListAllJobs(allJobs.data)
    }
    getJobs()
  }, [])

  const createProto = async () => {
    const newProto = {
      title: title,
      description: description,
      jobs: tempJobs
    }
    await axios.post('/api/protos', newProto)
    await axios.post('/api/jobs', tempJobs)
  }

  const toggleJobsVisible = () => {
    setJobFormVisible(prevState => !prevState)
  }

  return (
    // <div>
    //   <Grid container spacing={2} direction="column" alignItems="center">
    //     <Grid item xs={4}>
    //       <TextField id="proto-title" label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
    //     </Grid>
    //     <Grid item xs={2}>
    //       <TextField id="proto-description" label="Description" variant="filled" multiline rows={5} value={description} sx={{ width: '360px' }} onChange={(e) => setDescription(e.target.value)} />
    //     </Grid>
    //     <Grid item xs={4}>
    //       <JobInput listAllJobs={listAllJobs} setTempJobs={setTempJobs} />
    //       <Button onClick={createProto}>Create Proto</Button>
    //     </Grid>
    //     <Grid item xs={8}>
    //     </Grid>
    //   </Grid>
    //   <Grid container direction="column" alignItems="center" >
    //     <Typography>
    //       Proto Jobs
    //     </Typography>
    //   </Grid>
    // </div>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        gap: 1,
        padding: 5
      }}
    >

      <TextField id="proto-title" label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField id="proto-description" label="Description" variant="filled" multiline value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button onClick={toggleJobsVisible}>Add Job</Button>
      {jobFormVisible && <JobInput listAllJobs={listAllJobs} setTempJobs={setTempJobs} />}
      <Button onClick={createProto}>Create Proto</Button>
    </Box>
  )
}