import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, Box, Button, Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { clearDisplayedProtoList } from '../../reducers/displayedProtosReducer';

function SpeedDialClear({ open, handleClose }) {
  // const [selectedProtos, setSelectedProtos] = useState([]);
  // const userProtos = useSelector((state) => state.userProtos);
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
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography>
          This will clear all active Protos. Are you sure?
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={5}>
          <Button onClick={clearList}>Clear List</Button>
          <Button onClick={handleClose}>Cancel</Button>
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
