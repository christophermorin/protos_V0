import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ActiveReason from './ActiveReason';
import activeProtoServices from '../../services/activeProtoServices';
import userStatsServices from '../../services/userStatsServices';
import { setActiveProtos } from '../../reducers/activeProtosReducer';
import { displayedRemoveOne, displayedUpdateList } from '../../reducers/displayedProtosReducer';

function ActiveProtoHeader({
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
  const handleDelete = async () => {
    const result = await activeProtoServices.deleteOneFromActive(
      activeList._id,
      {
        protoId,
        userId: user.id,
      },
    );
    dispatch(setActiveProtos(result));
    dispatch(displayedRemoveOne(protoId));
  };

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
      const updateStatsProtos = await userStatsServices.updateStatsProtoCompleted(user.id, {
        title: protoTitle,
        isComplete,
      });
    } catch (error) {
      console.log('In complete proto', error);
    }
  };

  return (
    <Paper
      sx={{ padding: '16px 16px 0 16px' }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          fontWeight={700}
        >
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
        {isComplete && <Typography variant="caption" onClick={handleComplete} />}
      </Box>
    </Paper>
  );
}

ActiveProtoHeader.defaultProps = {
  protoDescription: null,
};

ActiveProtoHeader.propTypes = {
  protoTitle: PropTypes.string.isRequired,
  protoDescription: PropTypes.string,
  protoId: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default ActiveProtoHeader;
