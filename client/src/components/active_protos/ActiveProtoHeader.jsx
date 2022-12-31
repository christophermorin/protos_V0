import { Paper, Typography, Box } from "@mui/material"
export default function ActiveProtoHeader({ headers }) {
  return (
    <Paper
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        {headers.title}
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        gap: 2,
      }}>
        <Typography variant="caption">0/5 Jobs Complete</Typography>
        <Typography variant="caption">Total TIme</Typography>
        <Typography variant="caption">Sometihng Else</Typography>
      </Box>
    </Paper>
  )
}