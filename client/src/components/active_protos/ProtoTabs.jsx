import ActiveProto from './ActiveProto';
import { protoDb } from '../../protoDb';
import { Tabs, Tab, Grid, Box, Zoom, } from '@mui/material'
import { useState } from 'react'


export default function ProtoTabs() {
  const [protoArr, setProtoArr] = useState([])

  const handleClick = (event, proto) => {
    event.target.style.color = 'red'
    const found = protoArr.find(p => p._id === proto._id)
    console.log(protoArr.indexOf(found))
    if (!found) {
      setProtoArr(prevState => [...prevState, proto])
    } else {
      protoArr.splice(protoArr.indexOf(found), 1)
      const filter = protoArr.filter(p => p._id !== proto._id)
      event.target.style.color = ''
      setProtoArr(filter)

    }
  }

  //Display clicked protos
  const displayProtos = protoArr.map(proto => {
    return (
      <Grid item sx={{ padding: '0 10px', }}>
        <Zoom in={true} key={proto._id}>
          <Box>
            <ActiveProto proto={proto} />
          </Box>
        </Zoom>
      </Grid >
    )
  })

  const tabCount = protoDb.map(proto => {
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
      {/* <Tabs
        value={false}
        variant="scrollable"

    
      >
        {displayProtos}
      </Tabs> */}
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

