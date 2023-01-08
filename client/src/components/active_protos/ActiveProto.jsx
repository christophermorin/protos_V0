import ActiveProtoHeader from "./ActiveProtoHeader"
import ActiveWhy from "./ActiveWhy"
import JobCard from "./JobCard"
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Stack, Box } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ActiveProto({ proto }) {

  const jobslist = proto.jobs.map(job => {
    return (
      <JobCard key={job._id} job={job} protoId={proto._Id} />
    )
  })

  return (
    <Grid container spacing={0.5} key={proto._id} sx={{ marginTop: 5 }}>
      <Grid item xs={12}>
        <ActiveProtoHeader
          protoTitle={proto.title}
        />
      </Grid>
      <Grid item xs={12} >
        {proto.description &&
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
          </Accordion>}
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
            <Stack spacing={1}>
              {jobslist}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}