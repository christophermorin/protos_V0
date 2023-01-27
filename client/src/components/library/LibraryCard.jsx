import { Box } from "@mui/system"
export default function LibraryCard({ title }) {
  return (
    <Box style={styles}>
      {title}
    </Box>
  )
}

const styles = {
  border: '1px solid black',
  width: '360px',
  height: '100px',
}
