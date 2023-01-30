import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Grid, Stack, Switch, FormControlLabel, FormGroup, Dialog,
} from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import CreateProtoForm from './CreateProtoForm';
import CreateJobForm from './CreateJobForm';
import DisplayNewJob from './DisplayNewJob';
import userProtoServices from '../../services/userProtoServices';
import activeProtoServices from '../../services/activeProtoServices';
import { activeProtoAddOne } from '../../reducers/activeProtosReducer';
import { userProtosAddOne } from '../../reducers/userProtosReducer';

function BuildForm({ open, handleCloseBuild }) {
  const [protoTitle, setProtoTitle] = useState('');
  const [protoDescription, setProtoDescription] = useState('');
  const [protoTimeOfDay, setProtoTimeOfDay] = useState('');
  const [newProtoJobs, setNewProtoJobs] = useState([]);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  const activeProtos = useSelector((state) => state.activeProtos);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  const [color, setColor] = useState({
    r: '255',
    g: '255',
    b: '255',
    a: '1',
  });

  const handleTimeOfDay = (event, time) => {
    setProtoTimeOfDay(time);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  const deleteJob = (title) => {
    const filtered = newProtoJobs.filter((job) => job.title !== title);
    setNewProtoJobs(filtered);
  };

  const currentJobsList = newProtoJobs.map((job) => (
    <DisplayNewJob key={job.title} job={job} deleteJob={deleteJob} />
  ));

  const createProto = async () => {
    if (!protoTitle) {
      console.log('Title required');
      return -1;
    }
    const newProto = {
      title: protoTitle,
      description: editorJSON,
      timeOfDay: protoTimeOfDay,
      jobs: newProtoJobs,
    };
    try {
      const result = await userProtoServices.createNewProto(newProto, user.token);
      dispatch(userProtosAddOne(result));
      setProtoTitle('');
      setProtoDescription('');
      setProtoTimeOfDay('');
      setNewProtoJobs([]);
      setEditorState(() => EditorState.createEmpty());
      if (result && checked) {
        await activeProtoServices.addOneToActive(activeProtos._id, result);
        dispatch(activeProtoAddOne(result)); // Adding to activeList
      }
    } catch (error) {
      console.log(error, 'Proto already exists');
    }
  };
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
            sx={{ marginTop: 5 }}
          >
            {currentJobsList}
          </Stack>
          <CreateJobForm
            setNewProtoJobs={setNewProtoJobs}
            cardColor={color}
            setColor={setColor}
          />
          {activeProtos
            && (
              <FormGroup sx={{ marginTop: 2 }}>
                <FormControlLabel control={<Switch checked={checked} onClick={handleChecked} />} label="Add Proto to active list" />
              </FormGroup>
            )}
          <Button
            sx={{
              margin: '0 auto', marginTop: 2, marginBottom: 5, display: 'flex', justifyContent: 'center',
            }}
            onClick={createProto}
            variant="contained"
          >
            Create Proto
          </Button>

        </Grid>
      </Grid>
    </Dialog>
  );
}

BuildForm.defaultProps = {
  open: undefined,
};

BuildForm.propTypes = {
  open: PropTypes.bool,
  handleCloseBuild: PropTypes.func.isRequired,
};

export default BuildForm;
