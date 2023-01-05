import { useEffect, useState } from "react"
import axios from 'axios'
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Box } from "@mui/material"
import ActiveJobsList from "./ActiveJobsList"
import ActiveProtoHeader from "./ActiveProtoHeader"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActiveWhy from "./ActiveWhy"

export default function ActiveProto({ proto }) {

  return (
    <Grid container spacing={0.5} key={proto._id} sx={{ marginTop: 5 }}>
      <Grid item xs={12}>
        <ActiveProtoHeader proto={proto} />
      </Grid>
      <Grid item xs={12} >
        {proto.description && <Accordion disableGutters={true} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="The Why"
            id="proto-why"
          >
            <Typography
              variant="subtitle2"
              fontSize={15}
              fontWeight={700}
            >
              The Why
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ActiveWhy storedState={proto.description} />
          </AccordionDetails>
        </Accordion>}
        {/* </Grid> */}

        {/* <Grid item xs={12} md={6}> */}
        <Accordion
          disableGutters={true}
          defaultExpanded
          sx={{ marginTop: '5px' }}
        >
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
            <ActiveJobsList jobs={proto.jobs} protoId={proto._id} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}