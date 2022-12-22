import ActiveProtosList from "./ActiveProtosList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Active() {
  const [temp, setTemp] = useState()
  useEffect(() => {
    const getProtos = async () => {
      await axios.get('/api/protos')
        .then(res => setTemp(res.data))
    }
    getProtos()
  }, [])
  const protoList = temp ? temp.map(proto => {
    return (
      <ActiveProtosList key={proto._id} proto={proto} />
    )
  })
    :
    <h2>No active Protos</h2>

  return (
    <div>
      {protoList}
    </div>
  )
}