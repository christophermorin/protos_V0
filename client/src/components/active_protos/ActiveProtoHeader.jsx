import ActiveReason from "./ActiveReason"
import { Paper, Typography, Box } from "@mui/material"
export default function ActiveProtoHeader({ protoTitle, protoDescription }) {

  return (
    <Paper
      sx={{ padding: 2, }}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {protoTitle}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 2,
        gap: 2,
      }}>
        <ActiveReason protoDescription={protoDescription} />
        <Typography variant="caption" fontWeight={500}>Job Count</Typography>
        <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
      </Box>
    </Paper>
  )
}