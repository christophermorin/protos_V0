import ProtoTabs from "./ProtoTabs";
import { protoDb } from "../../protoDb";

export default function Active() {

  return (
    <>
      <ProtoTabs activeProtos={protoDb} />
    </>
  )
}