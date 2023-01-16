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
    <Grid container spacing={0.5} key={proto._id} sx={{ marginTop: 2, minWidth: '360px' }}>
      <Grid item xs={12}>
        <ActiveProtoHeader protoTitle={proto.title} protoDescription={proto.description} />
      </Grid>
      <Grid item xs={12} >
        <Accordion
          disableGutters={true}
          defaultExpanded
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