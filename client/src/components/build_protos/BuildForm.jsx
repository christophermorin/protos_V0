import { Button, Typography, Box, } from "@mui/material"
import { useState, useEffect } from 'react'
import axios from 'axios'

import CreateJobForm from "./CreateJobForm"
import NewJobList from "./NewJobList"
import CreateProtoForm from "./CreateProtoForm"





export default function BuildForm() {
  const [protoTitle, setProtoTitle] = useState('') // This state can stay here
  const [protoDescription, setProtoDescription] = useState('') // This state can stay here
  const [listAllJobs, setListAllJobs] = useState() // This is a list of all stored jobs in the DB



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
      title: protoTitle,
      description: protoDescription,
      jobs: newProtoJobs
    }
    await axios.post('/api/protos', newProto)

    // await axios.post('/api/jobs', newCreatedJobs)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}>
      <CreateProtoForm setProtoTitle={setProtoTitle} setProtoDescription={setProtoDescription} protoTitle={protoTitle} protoDescription={protoDescription} />
      <NewJobList newProtoJobs={newProtoJobs} setNewProtoJobs={setNewProtoJobs} />
      <Typography>
        Add a New Job
      </Typography>
      <CreateJobForm newProtoJobs={newProtoJobs} setNewProtoJobs={setNewProtoJobs} />
      <Button
        sx={{ marginTop: 10 }}
        onClick={createProto}
        variant="contained">
        Create Proto
      </Button>
    </Box>
  )
}