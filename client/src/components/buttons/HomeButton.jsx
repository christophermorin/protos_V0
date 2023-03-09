import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function HomeButton({ title }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        border: '2px solid #010100',
        borderRadius: '5px',
        padding: '15px',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '0.9rem',
        background: '#1f2937',
        transition: 'background 0.5s ease-in-out',
        '&:hover': {
          color: '#fff',
          background: '#1f29372e',
        },
      }}
    >
      <span style={{ position: 'relative', zIndex: 5 }}>
        {title}
      </span>
    </Button>
  );
}

export default HomeButton;
