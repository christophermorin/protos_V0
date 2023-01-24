import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreateProtoForm from "./CreateProtoForm"
import CreateJobForm from "./CreateJobForm"
import DisplayNewJob from './DisplayNewJob'
import protoServices from '../../services/protoServices'

import activeProtoServices from '../../services/activeProtoServices'
import { addOne } from '../../reducers/activeProtosReducer'

import { Button, Grid, Stack, Switch, FormControlLabel, FormGroup, Dialog } from "@mui/material"
import { EditorState, convertToRaw } from 'draft-js'


export default function BuildForm({ open, handleCloseBuild }) {
  const [protoTitle, setProtoTitle] = useState('') // This state can stay here
  const [protoDescription, setProtoDescription] = useState('') // This state can stay here
  const [protoTimeOfDay, setProtoTimeOfDay] = useState('') // This state can stau here
  const [newProtoJobs, setNewProtoJobs] = useState([]) // These are jobs being added to a created proto
  const [checked, setChecked] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth)
  const activeProtos = useSelector(state => state.activeProtos)

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

  const handleChecked = () => {
    setChecked(!checked)
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
    if (!protoTitle) {
      console.log('Title required')
      return -1
    }
    const newProto = {
      title: protoTitle,
      description: editorJSON,
      timeOfDay: protoTimeOfDay,
      jobs: newProtoJobs
    }
    try {

      const result = await protoServices.createNewProto(newProto, user.token)
      if (result && checked) {
        const addOneProto = await activeProtoServices.addOneToActive(activeProtos._id, result)
        dispatch(addOne(result))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open || false} onClose={handleCloseBuild}>
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={12}>
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
            sx={{ marginTop: 5, }}
          >
            {currentJobsList}
          </Stack>
          <CreateJobForm
            setNewProtoJobs={setNewProtoJobs}
            cardColor={color}
            setColor={setColor}
          />
          {activeProtos &&
            <FormGroup sx={{ marginTop: 2 }}>
              <FormControlLabel control={<Switch checked={checked} onClick={handleChecked} />} label="Add Proto to active list" />
            </FormGroup>}
          <Button
            sx={{ margin: '0 auto', marginTop: 2, marginBottom: 5, display: 'flex', justifyContent: 'center' }}
            onClick={createProto}
            variant="contained">
            Create Proto
          </Button>


        </Grid>
      </Grid >
    </Dialog >
  )
}