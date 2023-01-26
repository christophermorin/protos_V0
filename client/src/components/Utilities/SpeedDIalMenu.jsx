import { useState } from 'react';
import SpeedDialAdd from './SpeedDialAdd';
import SpeedDialClear from './SpeedDialClear';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';



export default function SpeedDialMenu() {
  const [openAdd, setAddOpen] = useState(false)
  const [openClear, setClearOpen] = useState(false)

  const openAddDialog = () => {
    setAddOpen(true)
  }
  const openClearDialog = () => {
    console.log('clear')
    setClearOpen(true)
  }

  const handleClose = () => {
    setAddOpen(false)
    setClearOpen(false)
  }

  const actions = [
    { icon: <DeleteIcon fontSize='large' />, name: 'Clear List', action: openClearDialog },
    { icon: <PlusOneIcon fontSize='large' />, name: 'Add Proto', action: openAddDialog },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            icon={action.icon}
            key={action.name}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
      <SpeedDialAdd open={openAdd} handleClose={handleClose} />
      <SpeedDialClear open={openClear} handleClose={handleClose} />
    </>
  )
}


// <Dialog open={open} onClose={handleClose}>
//   <DialogContent>
//     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={5}>
//       <Autocomplete
//         id="grouped-demo"
//         sx={{ minWidth: { xs: 300, md: 500 }, padding: 5 }}
//         value={selectedProtos}
//         onChange={(event, newValue) => {
//           setSelectedProtos(newValue);
//         }}
//         multiple
//         options={userProtos}
//         // groupBy={(option) => option.timeOfDay}
//         getOptionLabel={(option) => option.title}
//         renderInput={(params) => <TextField {...params} label="Protos" />}
//       />
//     </Box>
//   </DialogContent>
// </Dialog >