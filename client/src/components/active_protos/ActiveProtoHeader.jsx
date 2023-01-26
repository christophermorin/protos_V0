import { useState } from "react";
import ActiveReason from "./ActiveReason"
import activeProtoServices from "../../services/activeProtoServices";
import { setActiveProtos } from "../../reducers/activeProtosReducer";
import { protoWasDeleted, updateDisplayedList } from "../../reducers/displayedProtosReducer";
import { Paper, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux'

export default function ActiveProtoHeader({ protoTitle, protoDescription, protoId, listId, isComplete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch()
  const activeList = useSelector(state => state.activeProtos)
  const user = useSelector(state => state.userAuth)
  const displayedProtos = useSelector(state => state.displayedProtos)

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
        protoId: protoId,
        userId: user.id
      }
    )
    dispatch(setActiveProtos(result))
    dispatch(protoWasDeleted(protoId))
  }

  const handleComplete = async () => {
    try {
      const result = await activeProtoServices.completeProto(activeList._id,
        {
          protoId: protoId,
          isComplete: isComplete
        })
      const completedProto = result.find(proto => proto.id === protoId)
      dispatch(updateDisplayedList(completedProto))
    } catch (error) {
      console.log('In complete proto', error)
    }

  }

  return (
    <Paper
      sx={{ padding: '16px 16px 0 16px', background: '#eeeeee' }}>
      <Box display={'flex'} justifyContent='space-between'>
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
      }}>
        <ActiveReason protoDescription={protoDescription} />
        <Typography
          variant='caption'
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
    </Paper >
  )
}