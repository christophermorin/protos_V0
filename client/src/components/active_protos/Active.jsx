import ActiveProto from "./ActiveProto";
import ProtoTabs from "./ProtoTabs";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { protoDb } from "../../protoDb";

import { useSelector, useDispatch } from "react-redux";

export default function Active() {

  return (
    <>
      <ProtoTabs activeProtos={protoDb} />
    </>
  )
}