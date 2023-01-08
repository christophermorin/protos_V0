import { Paper, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
export default function ActiveProtoHeader({ protoTitle }) {
  // const [jobCount, setJobCount] = useState(protoJobs.length)
  // const [completedJobs, setCompletedJobs] = useState()

  // useEffect(() => {
  //   let complete = 0
  //   protoJobs.forEach(job => {
  //     if (job.isComplete) {
  //       complete += 1
  //     }
  //   })
  //   setCompletedJobs(complete)
  // }, [])


  return (
    <Paper
      sx={{ padding: 2, }}>
      <Typography sx={{ textAlign: 'center' }} variant="h4" fontWeight={700}>
        {protoTitle}
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        gap: 2,
      }}>
        <Typography variant="caption" fontWeight={500}>Job Count</Typography>
        <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
        <Typography variant="caption" fontWeight={500}>Sometihng Else</Typography>
      </Box>
    </Paper>
  )
}