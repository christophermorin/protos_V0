import { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import SpeedDialClear from './SpeedDialClear';
import SpeedDialAdd from './SpeedDialAdd';

export default function SpeedDialMenu() {
  const [openAdd, setAddOpen] = useState(false);
  const [openClear, setClearOpen] = useState(false);

  const openAddDialog = () => {
    setAddOpen(true);
  };
  const openClearDialog = () => {
    console.log('clear');
    setClearOpen(true);
  };

  const handleClose = () => {
    setAddOpen(false);
    setClearOpen(false);
  };

  const actions = [
    { icon: <DeleteIcon fontSize="large" sx={{ color: '#fff' }} />, name: 'Clear List', action: openClearDialog },
    { icon: <PlusOneIcon fontSize="large" sx={{ color: '#fff' }} />, name: 'Add Proto', action: openAddDialog },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16, }}
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
  );
}
