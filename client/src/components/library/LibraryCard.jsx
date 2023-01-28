import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function LibraryCard({ title }) {
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

LibraryCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LibraryCard;
