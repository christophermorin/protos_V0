import { Paper, Typography } from "@mui/material"
export default function ActiveProtoHeader({ headers }) {
  return (
    <Paper
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        marginBottom: 5

      }}
    >
      <h1>{headers.title}</h1>
      <Paper
        sx={{
          position: 'relative',
          top: 20,
          padding: 1
        }}
      >
        <h3>Description</h3>
        <Typography>
          {headers.description}
        </Typography>
      </Paper>
    </Paper>
  )
}