import { Box, TextField, Typography } from '@mui/material'
export default function CreateProtoForm({ setProtoTitle, setProtoDescription, protoTitle, protoDescription }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 300
    }}>
      <TextField id="proto-title" label="Title" variant="filled" value={protoTitle} onChange={(e) => setProtoTitle(e.target.value)} />
      <Typography sx={{
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold',
        margin: 0
      }}>
        Choose a title for your Proto. Short and sweet is best!
      </Typography>
      <TextField id="proto-description" label="Description" variant="filled" multiline value={protoDescription} onChange={(e) => setProtoDescription(e.target.value)} />
      <Typography sx={{
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold',
        margin: 0
      }}>
        Describe your Proto. What is it you are trying to achieve? What are the benefits of implementing this Proto into your life?
      </Typography>
    </Box>
  )
}