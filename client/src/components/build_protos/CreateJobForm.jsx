import PropTypes from 'prop-types';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import {
  Box,
  Paper,
  TextField,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import ActionButton from '../buttons/ActionButton';
import ColorPicker from './ColorPicker';

function CreateJobForm({ setNewProtoJobs, cardColor, setColor }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobTimer, setJobTimer] = useState(0);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const changeColor = (color, event) => {
    setColor(color.rgb);
  };

  const cancelAllFields = () => {
    setJobTitle('');
    setJobDesc('');
    setJobTimer('');
    setDisplayColorPicker(false);
    setColor('transparent');
  };

  const createJob = () => {
    const newJob = {
      title: jobTitle,
      description: jobDesc,
      timer: jobTimer,
      cardColor,
      isComplete: false,
      isHidden: false,
    };
    setNewProtoJobs((prevState) => [...prevState, newJob]);
    cancelAllFields();
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        gap: 2,
        padding: 2,
        background: `linear-gradient(135deg, rgba(${cardColor.r}, ${cardColor.g}, ${cardColor.b}, ${cardColor.a}), transparent 80%)`,
        marginTop: 5,
        border: '1px solid black',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <TextField
            id="standard-basic"
            label="Job Title"
            value={jobTitle}
            fullWidth
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2} alignSelf="flex-end">
          <TextField
            type="number"
            id="standard-basic"
            label="Time"
            value={jobTimer}
            onChange={(e) => setJobTimer(+e.target.value)}
            sx={{ maxWidth: { xs: 80 } }}
          />
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" gap={2}>
            <ActionButton title="Add" action={createJob} />
            <ActionButton title="Clear" action={cancelAllFields} buttonType="secondary" />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <ColorizeOutlinedIcon
              onClick={toggleColorPicker}
              sx={{
                fontSize: '30px',
              }}
            />
            <ColorPicker
              displayColorPicker={displayColorPicker}
              changeColor={changeColor}
              color={cardColor}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

CreateJobForm.propTypes = {
  setNewProtoJobs: PropTypes.func.isRequired,
  // cardColor: PropTypes.shape({
  //   r: PropTypes.number,
  //   g: PropTypes.number,
  //   b: PropTypes.number,
  //   a: PropTypes.number,
  // }).isRequired,
  setColor: PropTypes.func.isRequired,
};

export default CreateJobForm;
