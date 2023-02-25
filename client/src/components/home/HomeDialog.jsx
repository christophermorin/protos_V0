import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog, DialogContent, Box, Autocomplete, TextField,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import activeProtoServices from '../../services/activeProtoServices';
import { clearDisplayedProtoList } from '../../reducers/displayedProtosReducer';

function HomeDialog({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([]);
  const [openTemplates, setOpenTemplates] = useState(false);
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
      dispatch(clearDisplayedProtoList());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ marginLeft: { xs: 0, md: 25 } }}>
      {openTemplates
        ? (
          <DialogContent>
            <Box>
              Testing
            </Box>
          </DialogContent>
        )
        : (
          <DialogContent sx={{ border: '2px solid black' }}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={5}>
              <Box display="flex" flexDirection="row" flexWrap gap={1}>
                <ActionButton title="Use Template" />
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
                <ActionButton title="Create" action={createActiveList} />
                <ActionButton title="Cancel" action={handleClose} buttonType="secondary" />
              </Box>
            </Box>
          </DialogContent>
        )}
    </Dialog>

  );
}

HomeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default HomeDialog;
