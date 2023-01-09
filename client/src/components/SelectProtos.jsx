import { Dialog } from "@mui/material"
export default function SelectProtos({ open, id }) {

  return (
    <Dialog onClose={handleClose} open={open}>

    </Dialog>
  )
}



  // Dialog
      //Takes in all protos and filters by time of day clicked on (create one filter function that filters timeofday by prop)
        //Which means it has to take timeofday as a prop.
        //
      //Also takes in CURRENT protos added to DAYs list of Protos, so it can update this as more are added.
        //This List is then sent to the DB, and to ProtoTabs to display.
