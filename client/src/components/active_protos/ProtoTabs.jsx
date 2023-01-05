import { Tabs, Tab, Grid, Box, Zoom } from '@mui/material'


import { useState } from 'react'

import ActiveProto from './ActiveProto';

export default function ProtoTabs({ activeProtos }) {
  const [protoArr, setProtoArr] = useState([])

  const handleClick = (event, proto) => {
    event.target.style.color = 'red'
    const found = protoArr.find(p => p._id === proto._id)
    if (!found) {
      setProtoArr(prevState => [...prevState, proto])
    } else {
      const filter = protoArr.filter(p => p._id !== proto._id)
      event.target.style.color = ''

      setProtoArr(filter)

    }
  }


  //Display clicked protos
  const displayProtos = protoArr.map(proto => {
    return (
      <Zoom in={true} key={proto._id}>
        <Box width={360} sx={{ margin: '0 10px' }}>
          <ActiveProto proto={proto} />
        </Box>
      </Zoom>
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
      <Box>
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {tabCount}
        </Tabs>
      </Box>
      {displayProtos.length > 0 ? <Grid container sx={{ justifyContent: 'center' }}>
        {displayProtos}
      </Grid> : <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >No active Protos...</div>}
      {/* <Grid container>
        {displayProtos}
      </Grid> */}
    </Box >
  )
}

