import protoServices from "../../services/protoServices"
import { setAllProtosList } from "../../reducers/userProtosReducer"
import { Button, Grid, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// import HandymanIcon from '@mui/icons-material/Handyman';
import DashboardIcon from '@mui/icons-material/Dashboard';

import HomeDialog from "./HomeDialog"

export default function Home({ user }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getUserProtos = async () => {
      try {
        const result = await protoServices.getAllUserProtos(user.id)
        console.log(result)
        dispatch(setAllProtosList(result))
      } catch (error) {
        console.log(error)
      }
    }
    getUserProtos()
  }, [])

  const openDialog = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container justifyContent='center' alignItems='center' flexGrow={1} gap={5} height={'100%'}>
      <Grid item>
        <Box>
          {/* <HandymanIcon style={styles.icon} /> */}
        </Box>
      </Grid>
      <Grid item onClick={openDialog}>
        <Box>
          <RocketLaunchIcon style={styles.icon} />
        </Box>
      </Grid>
      <Grid item>
        <Box>
          Dashboard
        </Box>
      </Grid>
      <HomeDialog open={open} handleClose={handleClose} />
    </Grid>


  )
}

const styles = {
  icon: {
    border: '1px solid black',
    height: '200px',
    width: '200px',
  },
  start: {
    border: '1px solid black',
    height: '200px',
    width: '180px',
  }

}