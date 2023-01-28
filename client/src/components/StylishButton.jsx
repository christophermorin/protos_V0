import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function StylishButton({ title, action, color }) {
  return (
    <Button
      variant="contained"
      onClick={action}
      color={color}
    >
      {title}
    </Button>
  );
}

StylishButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StylishButton;
