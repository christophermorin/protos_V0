import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import { useSelector, useDispatch } from 'react-redux';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { setNotification, resetNotification } from '../../reducers/notificationsReducer';


function SpeedDialAdd({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([]);
  const userProtos = useSelector((state) => state.userProtos);
  const activeProtos = useSelector((state) => state.activeProtos);
  const dispatch = useDispatch();

  const addToList = async () => {
    if (!activeProtos) {
      dispatch(setNotification({
        title: 'No list currently active, please create one', severity: 'error'
      }))
      dispatch(resetNotification())
      return
    }
    try {
      const result = await activeProtoServices.addManyToActive(activeProtos._id, selectedProtos);
      dispatch(setActiveProtos(result));
      dispatch(setNotification({
        title: 'Proto added to active list', severity: 'success'
      }))
      dispatch(resetNotification())
    } catch (error) {
      console.log('In add many to list', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ marginLeft: { xs: 0, md: 25 } }}
    >
      <DialogContent sx={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(11, 15, 20, 1) 90%)' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography>
            Add a proto to the your active list
          </Typography>
          <Autocomplete
            id="grouped-demo"
            sx={{ minWidth: { xs: 300, md: 500 }, padding: 5 }}
            value={selectedProtos}
            onChange={(event, newValue) => {
              setSelectedProtos(newValue);
            }}
            multiple
            options={userProtos}
            // groupBy={(option) => option.timeOfDay}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Protos" />}
          />
          <ActionButton title={'Add'} action={addToList} />
          {/* <Button onClick={addToList}>Add</Button> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SpeedDialAdd.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SpeedDialAdd;
