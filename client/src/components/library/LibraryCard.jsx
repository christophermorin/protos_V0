import { Box } from '@mui/material';

export default function LibraryCard({ title }) {
  const styles = {
    border: '1px solid black',
    width: '360px',
    height: '100px',
  };

  return (
    <Box style={styles}>
      {title}
    </Box>
  );
}