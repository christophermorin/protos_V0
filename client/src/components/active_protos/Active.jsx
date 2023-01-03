import ActiveProtosList from "./ActiveProtosList";
import ProtoTabs from "./ProtoTabs";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Active() {
  const [activeProtos, setActiveProtos] = useState([])
  useEffect(() => {
    const getProtos = async () => {
      await axios.get('/api/protos')
        .then(res => setActiveProtos(res.data))
    }
    getProtos()
  }, [])

  const { id } = useParams()
  const protoList = activeProtos && activeProtos.map((proto) => {
    if (proto._id === id) {
      return (
        <Grid item xs={12} md={6} key={proto._id} >
          <ActiveProtosList key={proto._id} proto={proto} />
        </Grid>
      )
    }
  })


  return (
    <div>
      <ProtoTabs activeProtos={activeProtos} />
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,

        }}>
        {protoList}
      </Box>
    </div>
  )
}