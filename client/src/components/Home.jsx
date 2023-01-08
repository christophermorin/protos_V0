import { Grid, Box, Typography, } from "@mui/material"
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
export default function Home() {
  return (
    <div style={{ height: '90vh', display: 'flex', justifyContent: 'center' }}>
      <Grid container gap={15} >
        <Grid item md={12} container justifyContent='center' alignItems='center' gap={15} >
          <Box
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black'
            }}>
            <WbTwilightIcon fontSize="large" />
            <Typography>
              Morning
            </Typography>
          </Box>
          <Box
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black'
            }}>
            <WbSunnyIcon fontSize="large" />
            <Typography>
              Afternoon
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12} container justifyContent='center' alignItems='center' gap={15} >
          <Box
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black'
            }}>
            <NightlightIcon fontSize="large" />
            <Typography>
              Evening
            </Typography>
          </Box>
          <Box
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black'
            }}>
            <ReplayCircleFilledIcon fontSize="large" />
            <Typography>
              All Day
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}