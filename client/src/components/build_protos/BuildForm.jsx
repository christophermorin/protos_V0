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
  const [listAllJobs, setListAllJobs] = useState() // This is a list of all stored jobs in the DB

  const [jobFormVisible, setJobFormVisible] = useState(false) // setting the visibilty of add job form

  const [newCreatedJobs, setnewCreatedJobs] = useState([]) // These are jobs that are newly created
  const [newProtoJobs, setNewProtoJobs] = useState([]) // These are jobs being added to a created proto

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
      jobs: newProtoJobs
    }
    await axios.post('/api/protos', newProto)

    await axios.post('/api/jobs', newCreatedJobs)
  }

  const toggleJobsVisible = () => {
    setJobFormVisible(prevState => !prevState)
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 5
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 300
      }}>
        <TextField id="proto-title" label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField id="proto-description" label="Description" variant="filled" multiline value={description} onChange={(e) => setDescription(e.target.value)} />
      </Box>
      <Button onClick={toggleJobsVisible}>Add Job</Button>
      {jobFormVisible && <JobInput listAllJobs={listAllJobs} setnewCreatedJobs={setnewCreatedJobs} setListAllJobs={setListAllJobs} setNewProtoJobs={setNewProtoJobs} />}
      <Button onClick={createProto}>Create Proto</Button>
    </Box>
  )
}