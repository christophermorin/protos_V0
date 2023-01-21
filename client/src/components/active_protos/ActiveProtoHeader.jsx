import { useState } from "react";
import ActiveReason from "./ActiveReason"
import activeProtoServices from "../../services/activeProtoServices";
import { setActiveProtos } from "../../reducers/activeProtosReducer";
import { protoWasDeleted } from "../../reducers/displayedProtosReducer";
import { Paper, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux'


// pull in active proto list from store
// proto id from props
// on delete, findOne and delete using active proto id
// delete by proto id

export default function ActiveProtoHeader({ protoTitle, protoDescription, protoId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch()
  const activeList = useSelector(state => state.activeProtos)
  const user = useSelector(state => state.userAuth)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const result = await activeProtoServices.deleteOneFromActive(user.id, protoId)
    dispatch(setActiveProtos(result))
    dispatch(protoWasDeleted(protoId))
  }
  return (
    <Paper
      sx={{ padding: 2, background: '#eeeeee' }}>
      <Box display={'flex'} justifyContent='space-between'>
        <Typography variant="h4" fontWeight={700}>
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
        marginTop: 2,
        gap: 2,
      }}>
        <ActiveReason protoDescription={protoDescription} />
        <Typography variant="caption" fontWeight={500}>Job Count</Typography>
        <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
      </Box>
    </Paper>
  )
}