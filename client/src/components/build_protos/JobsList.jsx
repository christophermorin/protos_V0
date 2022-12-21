import { List, IconButton, ListItem, ListItemText, Grid, Typography, Divider } from "@mui/material"
// import DeleteIcon from '@mui/icons-material/Delete';
export default function JobsList() {
  const list = props.protoJobs && props.protoJobs.map(job => {
    return (
      <div key={job.id}>
        <ListItem>
          <ListItemText
            primary={job.title}
          />
        </ListItem>
      </div>
    )
  })

  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12} >
    //     <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
    //       Proto Jobs
    //     </Typography>
    <List>
      {list}
    </List>
    //   </Grid>
    // </Grid>
  )
}