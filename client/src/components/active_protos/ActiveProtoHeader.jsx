import { Paper, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
export default function ActiveProtoHeader({ proto }) {
  const [jobCount, setJobCount] = useState(proto.jobs.length)
  const [completedJobs, setCompletedJobs] = useState()

  useEffect(() => {
    let complete = 0
    proto.jobs.forEach(job => {
      if (job.isComplete) {
        complete += 1
      }
    })
    setCompletedJobs(complete)
  }, [proto])


  return (
    <Paper
      sx={{
        padding: 2,
        // paddingLeft: 1,
        // paddingRight: 1,
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant="h4" fontWeight={700}>
        {proto.title}
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        gap: 2,
      }}>
        <Typography variant="caption" fontWeight={500}>{completedJobs}/{jobCount} Jobs Complete</Typography>
        <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
        <Typography variant="caption" fontWeight={500}>Sometihng Else</Typography>
      </Box>
    </Paper>
  )
}