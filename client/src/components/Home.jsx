import { Box } from "@mui/material"
import { useState } from "react";
import HomeDialog from "./HomeDialog";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function Home() {
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={styles.container}>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
        gap={2}
        style={styles.box}
        onClick={openDialog}
      >
        <RocketLaunchIcon fontSize="large" />
      </Box>
      <HomeDialog open={open} handleClose={handleClose} />
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    top: '40%',
    width: '200px',
    margin: '0 auto',
  },
  box: {
    border: '1px solid black',
    padding: 10,

  }
}

