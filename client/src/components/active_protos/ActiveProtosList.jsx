import { useEffect, useState } from "react"
import axios from 'axios'
import { Paper, Box, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ActiveJobsList from "./ActiveJobsList"
import ActiveProtoHeader from "./ActiveProtoHeader"

export default function ActiveProtosList({ proto }) {
  // const [temp, setTemp] = useState()
  // useEffect(() => {
  //   const getProtos = async () => {
  //     await axios.get('/api/protos')
  //       .then(res => setTemp(res.data))
  //   }
  //   getProtos()
  // }, [])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
      }}
    >
      <Paper
        sx={{
          width: 360,
          minHeight: 300,
          padding: 1,
        }}
        elevation={3}
      >
        <ActiveProtoHeader headers={proto} />
        <ActiveJobsList jobs={proto.jobs} />
      </Paper>
    </Box >
  )
}