import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import { useSelector, useDispatch } from 'react-redux';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { clearDisplayedProtoList } from '../../reducers/displayedProtosReducer';

function SpeedDialClear({ open, handleClose }) {
  const activeProtos = useSelector((state) => state.activeProtos);
  const dispatch = useDispatch();

  const clearList = async () => {
    try {
      const result = await activeProtoServices
        .deleteActiveList(activeProtos._id, activeProtos.user);
      dispatch(clearDisplayedProtoList());
      dispatch(setActiveProtos(result));
    } catch (error) {
      console.log('In delete/clear list', error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ marginLeft: { xs: 0, md: 25 } }}
    >
      <DialogContent
        sx={{
          background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(11, 15, 20, 1) 90%)'
        }}
      >
        <Typography>
          This will clear all active Protos. Are you sure?
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={5}
          marginTop={2}
        >
          <ActionButton
            title={'Clear List'}
            action={clearList}
          />
          <ActionButton
            title={'Cancel'}
            action={handleClose}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SpeedDialClear.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SpeedDialClear;
