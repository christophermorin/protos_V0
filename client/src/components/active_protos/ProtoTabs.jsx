import { Tabs, Tab, Drawer, Button, Grid, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { useState } from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ActiveProto from './ActiveProto';

export default function ProtoTabs({ activeProtos }) {
  const [value, setValue] = useState(0);
  const [testArr, setTestArr] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (proto) => {
    const found = testArr.find(p => p._id === proto._id)
    if (!found) {
      setTestArr(prevState => [...prevState, proto])
    } else {
      const filter = testArr.filter(p => p._id !== proto._id)
      setTestArr(filter)
    }
  }

  const TabPanel = (props) => {
    const { value, index, children } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    )
  }

  //Display clicked protos
  const displayProtos = testArr.map(proto => {
    return (
      <Box key={proto._id} width={360}>
        <ActiveProto proto={proto} key={proto._id} />
      </Box>
    )
  })


  // Display one proto with tabs
  // const displayProtos = activeProtos.map((proto, i) => {
  //   return (
  //     <TabPanel key={proto._id} value={value} index={i}>
  //       <ActiveProto proto={proto} />
  //     </TabPanel>
  //   )
  // })

  const tabCount = activeProtos.map(proto => {
    return (
      <Tab key={proto._id} label={proto.title} onClick={() => handleClick(proto)} />
    )
  })






  return (

    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {tabCount}
        </Tabs>
      </Box>
      <Grid container>
        {displayProtos}
      </Grid>
    </Box>
  )
}

