import { Stack } from "@mui/material"
import JobCard from "./JobCard"
export default function ActiveJobsList({ jobs, protoId }) {
  const jobslist = jobs ? jobs.map(job => {
    return (
      <JobCard key={job._id} job={job} protoId={protoId} />
    )
  })
    : null

  return (
    <Stack spacing={1}>
      {jobslist}
    </Stack>
  )
}