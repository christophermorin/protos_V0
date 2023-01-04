
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from "@mui/material"
import ActiveJobsList from "./ActiveJobsList"
import ActiveProtoHeader from "./ActiveProtoHeader"

import ActiveProto from "./ActiveProto";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActiveWhy from "./ActiveWhy"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Test({ protos }) {
  const { id } = useParams()
  const protoOnDislay = protos.find(proto => proto._id === id)

  return (

    <div>
      {protoOnDislay ? <ActiveProto proto={protoOnDislay} /> : null}
    </div>

  )
}