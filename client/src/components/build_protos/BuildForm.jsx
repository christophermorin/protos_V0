import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Stack,
  Switch,
  FormControlLabel,
  FormGroup,
  Dialog,
} from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import CreateProtoForm from './CreateProtoForm';
import CreateJobForm from './CreateJobForm';
import DisplayNewJob from './DisplayNewJob';
import ActionButton from '../buttons/ActionButton';
import userProtoServices from '../../services/userProtoServices';
import activeProtoServices from '../../services/activeProtoServices';
import { activeProtoAddOne } from '../../reducers/activeProtosReducer';
import { userProtosAddOne } from '../../reducers/userProtosReducer';
import { setNotification, resetNotification } from '../../reducers/notificationsReducer';

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
    r: '76',
    g: '98',
    b: '126',
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
      dispatch(setNotification({
        title: 'Proto Title required', severity: 'error',
      }));
      dispatch(resetNotification());
      return;
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
        dispatch(activeProtoAddOne(result));
      }
      dispatch(setNotification({
        title: checked ? 'New Proto added to active list' : 'New Proto created', severity: 'success',
      }));
      dispatch(resetNotification());
    } catch (error) {
      dispatch(setNotification({
        title: 'Failed. Do you already have a Proto by this name?', severity: 'error',
      }));
      dispatch(resetNotification());
    }
  };
  return (
    <Dialog
      open={open || false}
      onClose={handleCloseBuild}
      sx={{ marginLeft: { xs: 0, md: 25 } }}
    >
      <Grid
        container
        sx={{
          padding: 2,
          background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(11, 15, 20, 1) 90%)',
        }}
      >
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
                <FormControlLabel
                  control={<Switch checked={checked} onClick={handleChecked} />}
                  label="Add Proto to active list"
                />
              </FormGroup>
            )}
          <Box
            display="flex"
            justifyContent="center"
            marginTop={2}
          >
            <ActionButton title="Create Proto" action={createProto} />
          </Box>
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
