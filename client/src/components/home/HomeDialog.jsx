import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog, DialogContent, Box, Autocomplete, TextField,
} from '@mui/material';
import StylishButton from '../StylishButton';
import activeProtoServices from '../../services/activeProtoServices';
import { clearDisplayProtoList } from '../../reducers/displayedProtosReducer';

export default function HomeDialog({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([]);
  const userProtos = useSelector((state) => state.userProtos);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth);

  // Creates a new active proto list
  // Clears currently displayed protos on creation
  const createActiveList = async () => {
    if (selectedProtos.length === 0) {
      console.log('Error: Protos list empty');
      return;
    }
    try {
      const newActiveProtos = {
        selectedProtos,
        user: user.id,
      };
      await activeProtoServices.createActiveList(newActiveProtos);
      dispatch(clearDisplayProtoList());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={5}>
          <Box display="flex" flexDirection="row" flexWrap gap={1}>
            <StylishButton title="Use Template" />
          </Box>
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
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={10}>
            <StylishButton action={createActiveList} title="Create" />
            <StylishButton action={handleClose} title="Cancel" color="secondary" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
