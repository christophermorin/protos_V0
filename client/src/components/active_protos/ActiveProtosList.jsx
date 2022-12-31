import { useEffect, useState } from "react"
import axios from 'axios'
import { Paper, Box, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ActiveJobsList from "./ActiveJobsList"
import ActiveProtoHeader from "./ActiveProtoHeader"


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActiveWhy from "./ActiveWhy"


export default function ActiveProtosList({ proto }) {
  // const [temp, setTemp] = useState()
  // useEffect(() => {
  //   const getProtos = async () => {
  //     await axios.get('/api/protos')
  //       .then(res => setTemp(res.data))
  //   }
  //   getProtos()
  // }, [])


  return (
    <Box
      sx={{
        width: 360,
        padding: 1,
      }}
    >
      <ActiveProtoHeader headers={proto} />

      {proto.description && <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="The Why"
          id="proto-why"
        >
          The Why...
        </AccordionSummary>
        <AccordionDetails>
          {/* <Paper> */}
          <ActiveWhy storedState={proto.description} />
          {/* </Paper> */}
        </AccordionDetails>
      </Accordion>}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="The How"
          id="proto-how"
        >
          The How...
        </AccordionSummary>
        <AccordionDetails>
          {/* <Paper> */}
          <ActiveJobsList jobs={proto.jobs} />
          {/* </Paper> */}
        </AccordionDetails>
      </Accordion>
      {/* <TestHtml storedState={proto.description} /> */}

    </Box>
  )
}