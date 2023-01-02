import { Stack } from "@mui/material"
import JobCard from "./JobCard"
export default function ActiveJobsList({ jobs }) {
  const jobslist = jobs ? jobs.map(job => {
    return (
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