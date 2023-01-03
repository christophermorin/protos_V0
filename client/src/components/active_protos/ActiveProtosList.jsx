import { useEffect, useState } from "react"
import axios from 'axios'
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from "@mui/material"
import ActiveJobsList from "./ActiveJobsList"
import ActiveProtoHeader from "./ActiveProtoHeader"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActiveWhy from "./ActiveWhy"

export default function ActiveProtosList({ proto, index }) {
  // const [temp, setTemp] = useState()
  // useEffect(() => {
  //   const getProtos = async () => {
  //     await axios.get('/api/protos')
  //       .then(res => setTemp(res.data))
  //   }
  //   getProtos()
  // }, [])
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <ActiveProtoHeader proto={proto} />
      </Grid>
      <Grid item xs={12} md={6}>
        {proto.description && <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="The Why"
            id="proto-why"
          >
            <Typography
              variant="subtitle2"
              fontSize={15}
              fontWeight={'bold'}
            >
              The Why
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ActiveWhy storedState={proto.description} />
          </AccordionDetails>
        </Accordion>}
      </Grid>

      <Grid item xs={12} md={6}>
        <Accordion
          defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="The How"
            id="proto-how"
          >
            <Typography
              variant="subtitle2"
              fontSize={15}
              fontWeight={'bold'}
            >
              The How
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ActiveJobsList jobs={proto.jobs} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}