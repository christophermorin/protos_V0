import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function ActionButton({ title, action, buttonType }) {
  return (
    <Button
      onClick={action}
      sx={{
        background: '#1f2937',
        transition: 'background 0.5s ease-in-out',
        '&:hover': {
          background: '#1f29372e',
        },
      }}
    >
      <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
    </Button>
  );
}

export default ActionButton;
