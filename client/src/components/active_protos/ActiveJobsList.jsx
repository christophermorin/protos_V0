import { Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
// import ActiveJob from "./ActiveJob"
import JobCard from "./JobCard"
export default function ActiveJobsList({ jobs }) {
  const jobslist = jobs ? jobs.map(job => {
    return (
      // <ActiveJob key={job._id} job={job} />
      <JobCard key={job._id} job={job} />
    )
  })
    : null

  return (
    <Stack spacing={1}>
      {jobslist}
    </Stack>
  )
}