import ActiveProtosList from "./ActiveProtosList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack } from "@mui/material";

export default function Active() {
  const [temp, setTemp] = useState()
  useEffect(() => {
    const getProtos = async () => {
      await axios.get('/api/protos')
        .then(res => setTemp(res.data))
    }
    getProtos()
  }, [])
  const protoList = temp && temp.map(proto => {
    return (
      <ActiveProtosList key={proto._id} proto={proto} />
    )
  })

  return (
    <Stack spacing={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 5,
      }}>
      {protoList}
    </Stack>
  )
}