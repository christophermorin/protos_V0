import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import activeProtoServices from "../services/activeProtoServices"
import { setAllActiveList } from "../reducers/activeProtosReducer"
import { Dialog, DialogContent, DialogActions, Button, Box, Autocomplete, TextField } from "@mui/material"

export default function HomeDialog({ open, handleClose }) {
  const [activeList, setActiveList] = useState([])
  const userProtos = useSelector(state => state.userProtos)
  const dispatch = useDispatch()


  const createActiveList = async () => {
    const newList = {
      activeProtos: activeList
    }
    const result = await activeProtoServices.createActiveList(newList)
    dispatch(setAllActiveList(result.activeProtos))
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Autocomplete
            id="grouped-demo"
            sx={{ minWidth: 300 }}
            value={activeList}
            onChange={(event, newValue) => {
              setActiveList(newValue);
            }}
            multiple
            options={userProtos}
            groupBy={(option) => option.timeOfDay}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Protos" />}
          />
          <Box display='flex' flexDirection='column'>
            <Button>
              Build New Proto
            </Button>
            <Button>
              Use Template
            </Button>
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={createActiveList}>Create</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog >
  )
}

