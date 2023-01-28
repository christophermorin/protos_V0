import PropTypes from 'prop-types';
import {
  Box, TextField, Paper, ToggleButton, ToggleButtonGroup, Tooltip,
} from '@mui/material';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import ProtoDescriptionForm from './ProtoDescriptionForm';

function CreateProtoForm({
  setProtoTitle, protoTitle, handleTimeOfDay, protoTimeOfDay, editorState, setEditorState,
}) {
  return (
    <Paper sx={{
      textAlign: 'center',
      border: '1px solid black',
    }}
    >
      <Box>
        <TextField
          id="proto-title"
          label="Proto Title..."
          variant="filled"
          value={protoTitle}
          onChange={(e) => setProtoTitle(e.target.value)}
          fullWidth
        />
        <ProtoDescriptionForm editorState={editorState} setEditorState={setEditorState} />
      </Box>
      {/* Seperate into new component */}
      <ToggleButtonGroup
        value={protoTimeOfDay}
        exclusive
        onChange={handleTimeOfDay}
        aria-label="text alignment"
        size="small"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <ToggleButton value={0} aria-label="morning">
          <Tooltip title="Morning" placement="top-end">
            <WbTwilightIcon sx={{ color: '#ffd600' }} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={1} aria-label="afternoon">
          <Tooltip title="Afternoon" placement="top-end">
            <WbSunnyIcon sx={{ color: 'orange' }} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={2} aria-label="evening">
          <Tooltip title="Evening" placement="top-end">
            <NightlightIcon sx={{ color: 'darkblue' }} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={3} aria-label="continuous">
          <Tooltip title="Continuous" placement="top-end">
            <ReplayCircleFilledIcon sx={{ color: 'green' }} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}

CreateProtoForm.defaultProps = {
  protoTimeOfDay: '',
};

CreateProtoForm.propTypes = {
  setProtoTitle: PropTypes.func.isRequired,
  protoTitle: PropTypes.string.isRequired,
  handleTimeOfDay: PropTypes.func.isRequired,
  protoTimeOfDay: PropTypes.string,
  // editorState:
  setEditorState: PropTypes.func.isRequired,
};

export default CreateProtoForm;
