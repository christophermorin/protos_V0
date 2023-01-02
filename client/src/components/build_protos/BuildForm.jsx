import axios from 'axios'
import { Button, Grid } from "@mui/material"
import { useState } from 'react'

import { EditorState, convertToRaw } from 'draft-js'

import CreateProtoForm from "./CreateProtoForm"
import NewJobList from "./NewJobList"
import CreateJobForm from "./CreateJobForm"

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
      description: editorJSON,
      timeOfDay: protoTimeOfDay,
      jobs: newProtoJobs
    }
    await axios.post('/api/protos', newProto)

    // await axios.post('/api/jobs', newCreatedJobs)
  }
  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      <Grid item sm={12} md={6}>
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
      </Grid>
      <Grid item sm={12} md={6}>
        {newProtoJobs.length > 0 &&
          <NewJobList
            newProtoJobs={newProtoJobs}
            setNewProtoJobs={setNewProtoJobs}
          />}
        <CreateJobForm
          setNewProtoJobs={setNewProtoJobs}
          cardColor={color}
          setColor={setColor}
        />
      </Grid>
      <Button
        sx={{ margin: '0 auto', marginTop: 5, marginBottom: 5 }}
        onClick={createProto}
        variant="contained">
        Create Proto
      </Button>
    </Grid>
  )
}