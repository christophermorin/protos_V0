import ActiveProtoHeader from "./ActiveProtoHeader"
import JobCard from "./JobCard"
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Stack } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";

export default function ActiveProto({ proto }) {
  const activeList = useSelector(state => state.activeProtos)
  const jobslist = proto.jobs.map(job => {
    return (
      <JobCard key={job._id} job={job} listId={activeList._id} protoId={proto._id} />
    )
  })

  return (
    <Grid container spacing={0.5} key={proto._id} sx={{ maxWidth: { xs: 'unset', md: '360px' }, minWidth: '360px' }}>
      <Grid item xs={12}>
        <ActiveProtoHeader protoTitle={proto.title} protoDescription={proto.description} protoId={proto._id} listId={activeList._id} isComplete={proto.isComplete} />
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
            sx={{ background: '#eeeeee' }}

          >
            <Typography variant="caption" fontWeight={500}>Job Count</Typography>
            <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
            {/* <Typography
              variant="subtitle2"
              fontSize={15}
              fontWeight={'bold'}
            >
              The How
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ background: '#eeeeee' }}>
            <Stack spacing={1} sx={{ maxHeight: '55vh', overflowY: 'scroll', paddingBottom: 1, }}>
              {jobslist}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}