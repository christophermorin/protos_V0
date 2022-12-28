import DisplayNewJob from "./DisplayNewJob"
import { Stack } from "@mui/material"
export default function NewJobList({ newProtoJobs, setNewProtoJobs }) {

  const deleteJob = (title) => {
    const filtered = newProtoJobs.filter(job => job.title !== title)
    setNewProtoJobs(filtered)
  }

  const currentJobsList = newProtoJobs.map(job => {
    return (
      <DisplayNewJob key={job.title} job={job} deleteJob={deleteJob} />
    )
  })
  return (
    <Stack spacing={1} sx={{
      width: 360,
      marginBottom: 10

    }}>
      {currentJobsList}
    </Stack>
  )
}