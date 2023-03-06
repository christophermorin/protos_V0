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
import { useTheme } from '@emotion/react';
import ActionButton from '../buttons/ActionButton';
import activeProtoServices from '../../services/activeProtoServices';
import { clearDisplayedProtoList } from '../../reducers/displayedProtosReducer';

function HomeDialog({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([]);
  const [openTemplates, setOpenTemplates] = useState(false);
  const userProtos = useSelector((state) => state.userProtos);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth);
  const theme = useTheme()

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
      <DialogContent sx={{ border: '2px solid black', background: '#1f2937' }}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={5}>
          <Typography
            variant="h2"
          >
            Protos
          </Typography>
          <Grid container direction={{ xs: 'column', md: 'row' }}>
            <Grid item md={4}>
              <Typography
                variant="caption"
                fontWeight={700}
              >
                Something about using templates, foggy brain.
              </Typography>
            </Grid>
            <Grid container item md={8} justifyContent="center">
              <Button sx={{ width: '100%', border: '1px solid black' }}>Open Templates</Button>
            </Grid>
          </Grid>
          <Grid container direction={{ xs: 'column', md: 'row' }}>
            <Grid item md={4}>
              <Typography
                variant="caption"
                fontWeight={700}
              >
                Placement text here I can't think of what to say right now.
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Autocomplete
                id="grouped-demo"
                // sx={{ minWidth: { xs: 300, md: 500 } }}
                value={selectedProtos}
                onChange={(event, newValue) => {
                  setSelectedProtos(newValue);
                }}
                multiple
                options={userProtos}
                // groupBy={(option) => option.timeOfDay}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Select Protos" />}
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
