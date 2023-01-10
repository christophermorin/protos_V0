import ActiveProto from './ActiveProto';
import { Tabs, Tab, Grid, Box, Zoom, } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProtoTabs() {
  const [protoArr, setProtoArr] = useState([])
  const activeProtos = useSelector(state => state.activeProtos)

  const handleClick = (event, proto) => {
    event.target.style.color = 'red'
    const found = protoArr.find(p => p._id === proto._id)
    if (!found) {
      setProtoArr(prevState => [...prevState, proto])
    } else {
      protoArr.splice(protoArr.indexOf(found), 1)
      const filter = protoArr.filter(p => p._id !== proto._id)
      event.target.style.color = ''
      setProtoArr(filter)
    }
  }

  //Display selected protos
  const displayProtos = protoArr.map(proto => {
    return (
      <Grid item key={proto._id} sx={{ padding: '0 10px', }}>
        <Zoom in={true}>
          <Box>
            <ActiveProto proto={proto} />
          </Box>
        </Zoom>
      </Grid >
    )
  })

  const tabCount = activeProtos.map(proto => {
    return (
      <Tab key={proto._id} label={proto.title} onClick={() => handleClick(event, proto)}
      />
    )
  })

  return (
    <Box>
      <Tabs
        value={false}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {tabCount}
      </Tabs>
      <Box>
        {displayProtos.length > 0
          ?
          <Grid container direction='row' wrap='nowrap' sx={{ overflowX: 'scroll', height: '88vh', }} >
            {displayProtos}
          </Grid>
          :
          <div style={{ display: 'flex', justifyContent: 'center' }} >No active Protos...</div>}
      </Box>
    </Box >
  )
}