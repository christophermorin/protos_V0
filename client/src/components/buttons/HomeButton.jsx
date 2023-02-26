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
        transition: 'box-shadow 0.5s ease-in',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          width: 'calc(100%)',
          height: 'calc(100%)',
          backgroundColor: '#ffffff',
          transition: 'transform 0.3s ease-in-out',
          transform: 'scaleY(0)',
        },
        '&:hover::before': {
          transform: 'scaleY(1)',
        },
        '&:hover': {
          color: '#000000',
          boxShadow: '0 10px 1px 2px black',
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
