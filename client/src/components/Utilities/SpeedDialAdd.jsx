import { useState } from 'react';
import { Dialog, DialogContent, Box, Autocomplete, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import activeProtoServices from '../../services/activeProtoServices'
import { setActiveProtos } from '../../reducers/activeProtosReducer';

export default function SpeedDialAdd({ open, handleClose }) {
  const [selectedProtos, setSelectedProtos] = useState([])
  const userProtos = useSelector(state => state.userProtos)
  const activeProtos = useSelector(state => state.activeProtos)
  const dispatch = useDispatch()

  const addToList = async () => {
    if (!activeProtos) {
      console.log('No list currently active, please create one')
      return -1
    }
    try {
      const result = await activeProtoServices.addManyToActive(activeProtos._id, selectedProtos)
      dispatch(setActiveProtos(result))
    } catch (error) {
      console.log('In add many to list', error)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={5}>
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
          <Button onClick={addToList}>Add</Button>
        </Box>
      </DialogContent>
    </Dialog >
  )
}