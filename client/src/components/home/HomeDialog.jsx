import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  Box,
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import activeProtoServices from '../../services/activeProtoServices';
import { clearDisplayedProtoList } from '../../reducers/displayedProtosReducer';

function HomeDialog({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([]);
  const userProtos = useSelector((state) => state.userProtos);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth);

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
      <DialogContent sx={{ border: '2px solid black', background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(11, 15, 20, 1) 90%)' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
        >
          <Typography
            variant="h2"
          >
            Protos
          </Typography>
          <Grid container direction='column' gap={2}>
            <Grid item md={4}>
              <Typography
                variant="body2"
                fontWeight={700}
              >
                Select a prebuilt template:
              </Typography>
            </Grid>
            <Grid container item md={8} justifyContent="center">
              <Button
                sx={{ width: '100%', border: '1px solid black' }}
              >
                Open Templates
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='column' gap={2}>
            <Grid item md={4}>
              <Typography
                variant="body2"
                fontWeight={700}
              >
                Create your day:
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Autocomplete
                id="grouped-demo"
                value={selectedProtos}
                onChange={(event, newValue) => {
                  setSelectedProtos(newValue);
                }}
                multiple
                options={userProtos}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Protos" />}
              />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row" justifyContent="space-between" gap={10}>
            <ActionButton title="Create" action={createActiveList} />
            <ActionButton title="Cancel" action={handleClose} buttonType="secondary" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>

  );
}

HomeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default HomeDialog;
