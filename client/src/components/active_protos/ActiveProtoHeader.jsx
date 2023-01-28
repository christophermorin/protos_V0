import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, Typography, Box, IconButton, Menu, MenuItem,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ActiveReason from './ActiveReason';
import activeProtoServices from '../../services/activeProtoServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { protoWasDeleted, displayedUpdateList } from '../../reducers/displayedProtosReducer';

export default function ActiveProtoHeader({
  protoTitle, protoDescription, protoId, isComplete,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const activeList = useSelector((state) => state.activeProtos);
  const user = useSelector((state) => state.userAuth);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Needs error handling.
  const handleDelete = async () => {
    const result = await activeProtoServices.deleteOneFromActive(
      activeList._id,
      {
        protoId,
        userId: user.id,
      },
    );
    dispatch(setActiveProtos(result));
    dispatch(protoWasDeleted(protoId));
  };
  // Needs error handling.
  const handleComplete = async () => {
    try {
      const result = await activeProtoServices.completeProto(
        activeList._id,
        {
          protoId,
          isComplete,
        },
      );
      const updatedProto = result.find((proto) => proto._id === protoId);
      dispatch(displayedUpdateList(updatedProto));
    } catch (error) {
      console.log('In complete proto', error);
    }
  };

  return (
    <Paper
      sx={{ padding: '16px 16px 0 16px', background: '#eeeeee' }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
          {protoTitle}
        </Typography>
        <IconButton
          size="large"
          aria-label="proto options"
          aria-controls="options menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
      }}
      >
        <ActiveReason protoDescription={protoDescription} />
        <Typography
          variant="caption"
          fontWeight={500}
          sx={{
            '&:hover': { color: 'red' },
            cursor: 'pointer',
          }}
          onClick={handleComplete}
        >
          Complete
        </Typography>
      </Box>
    </Paper>
  );
}
