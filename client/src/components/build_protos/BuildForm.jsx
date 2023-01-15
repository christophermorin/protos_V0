import axios from 'axios'
import { Button, Grid, Stack } from "@mui/material"
import { useState } from 'react'

import { EditorState, convertToRaw } from 'draft-js'

import CreateProtoForm from "./CreateProtoForm"
import CreateJobForm from "./CreateJobForm"
import DisplayNewJob from './DisplayNewJob'
import protoServices from '../../services/protoServices'

export default function BuildForm() {
  const [protoTitle, setProtoTitle] = useState('') // This state can stay here
  const [protoDescription, setProtoDescription] = useState('') // This state can stay here
  const [protoTimeOfDay, setProtoTimeOfDay] = useState('') // This state can stau here
  const [newProtoJobs, setNewProtoJobs] = useState([]) // These are jobs being added to a created proto
  // const [listAllJobs, setListAllJobs] = useState() ***UNUSED

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )
  const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  const [color, setColor] = useState({
    r: '255',
    g: '255',
    b: '255',
    a: '1',
  })

  const handleTimeOfDay = (event, time) => {
    setProtoTimeOfDay(time)
  }

  const deleteJob = (title) => {
    const filtered = newProtoJobs.filter(job => job.title !== title)
    setNewProtoJobs(filtered)
  }

  const currentJobsList = newProtoJobs.map(job => {
    return (
      <DisplayNewJob key={job.title} job={job} deleteJob={deleteJob} />
    )
  })

  const createProto = async () => {
    const newProto = {
      title: protoTitle,
      description: editorJSON,
    }
    try {
      const result = await protoServices.createNewProto(newProto)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Grid container spacing={2} sx={{ marginTop: 5, justifyContent: 'center' }}>
      <Grid item xs={12} md={6}>
        <CreateProtoForm
          setProtoTitle={setProtoTitle}
          setProtoDescription={setProtoDescription}
          protoTitle={protoTitle}
          protoDescription={protoDescription}
          handleTimeOfDay={handleTimeOfDay}
          protoTimeOfDay={protoTimeOfDay}
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <Stack
          spacing={1}
          sx={{ marginTop: 5 }}
        >
          {currentJobsList}
        </Stack>
        <CreateJobForm
          setNewProtoJobs={setNewProtoJobs}
          cardColor={color}
          setColor={setColor}
        />
        <Button
          sx={{ margin: '0 auto', marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center' }}
          onClick={createProto}
          variant="contained">
          Create Proto
        </Button>
      </Grid>
    </Grid >
  )
}