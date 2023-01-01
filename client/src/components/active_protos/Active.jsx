import ActiveProtosList from "./ActiveProtosList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Divider, Stack } from "@mui/material";

export default function Active() {
  const [activeProtos, setActiveProtos] = useState()
  useEffect(() => {
    const getProtos = async () => {
      await axios.get('/api/protos')
        .then(res => setActiveProtos(res.data))
    }
    getProtos()
  }, [])
  const protoList = activeProtos && activeProtos.map(proto => {
    return (
      <ActiveProtosList key={proto._id} proto={proto} />
    )
  })

  return (
    <Stack spacing={3}
      sx={{
        // display: 'flex',
        // alignItems: 'center',
        // flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5
      }}>
      {protoList}
    </Stack>
  )
}