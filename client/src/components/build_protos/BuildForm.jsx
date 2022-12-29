import axios from 'axios'
import { Button, Typography, Box, } from "@mui/material"
import { useState, useEffect } from 'react'

import CreateProtoForm from "./CreateProtoForm"
import NewJobList from "./NewJobList"
import CreateJobForm from "./CreateJobForm"

export default function BuildForm() {
  const [protoTitle, setProtoTitle] = useState('') // This state can stay here
  const [protoDescription, setProtoDescription] = useState('') // This state can stay here
  const [protoTimeOfDay, setProtoTimeOfDay] = useState('') // This state can stau here
  const [newProtoJobs, setNewProtoJobs] = useState([]) // These are jobs being added to a created proto
  // const [listAllJobs, setListAllJobs] = useState() ***UNUSED
  const [color, setColor] = useState({
    r: '255',
    g: '255',
    b: '255',
    a: '1',
  })

  const handleTimeOfDay = (event, time) => {
    setProtoTimeOfDay(time)
  }

  // const [newCreatedJobs, setnewCreatedJobs] = useState([]) These are jobs that are newly created, used to add unique jobs to DB when a protos is created. *** UNUSED

  // Getting all unique jobs from DB on load. UNUSED
  // useEffect(() => {
  //   const getJobs = async () => {
  //     const allJobs = await axios.get('/api/jobs')
  //     setListAllJobs(allJobs.data)
  //   }
  //   getJobs()
  // }, [])

  const createProto = async () => {
    const newProto = {
      title: protoTitle,
      description: protoDescription,
      timeOfDay: protoTimeOfDay,
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
      <CreateProtoForm
        setProtoTitle={setProtoTitle}
        setProtoDescription={setProtoDescription}
        protoTitle={protoTitle}
        protoDescription={protoDescription}
        handleTimeOfDay={handleTimeOfDay}
        protoTimeOfDay={protoTimeOfDay}
      />
      <NewJobList
        newProtoJobs={newProtoJobs}
        setNewProtoJobs={setNewProtoJobs}
      />
      <Typography>
        Add a New Job
      </Typography>
      <CreateJobForm
        setNewProtoJobs={setNewProtoJobs}
        cardColor={color}
        setColor={setColor}
      />
      <Button
        sx={{ marginTop: 5 }}
        onClick={createProto}
        variant="contained">
        Create Proto
      </Button>
    </Box>
  )
}