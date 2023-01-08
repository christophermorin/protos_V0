import { Paper, Typography, Box } from "@mui/material"
import ActiveReason from "./ActiveReason"
import { useEffect, useState } from "react"
export default function ActiveProtoHeader({ protoTitle, protoDescription }) {
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
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {protoTitle}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        gap: 2,
      }}>
        <ActiveReason protoDescription={protoDescription} />
        <Typography variant="caption" fontWeight={500}>Job Count</Typography>
        <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
      </Box>
    </Paper>
  )
}