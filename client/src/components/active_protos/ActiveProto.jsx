import ActiveProtoHeader from "./ActiveProtoHeader"
import JobCard from "./JobCard"
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Stack, Box, Tooltip } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ActiveProto({ proto }) {

  const jobslist = proto.jobs.map(job => {
    return (
      <JobCard key={job._id} job={job} protoId={proto._Id} />
    )
  })

  return (
    <Grid container spacing={0.5} key={proto._id} sx={{ marginTop: 2, }}>
      <Grid item xs={12}>
        <ActiveProtoHeader protoTitle={proto.title} protoDescription={proto.description} />
      </Grid>
      <Grid item xs={12} >
        {/* {proto.description &&
          <Accordion disableGutters={true} >
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
              <ActiveWhy protoDescription={proto.description} />
            </AccordionDetails>
          </Accordion>} */}
        <Accordion
          disableGutters={true}
          defaultExpanded
        // sx={{ marginTop: '5px' }}
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
            <Stack spacing={1} sx={{ maxHeight: '55vh', overflowY: 'scroll' }}>
              {jobslist}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}