import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function NavButton({ title, nav, action }) {
  return (
    <Button
      onClick={action}
      component={Link}
      to={nav}
      sx={{
        background: '#1f29372e',
        transition: 'background 0.5s ease-in-out',
        '&:hover': {
          background: '#1f2937',
        },
      }}
    >
      {title}
    </Button>
  );
}
export default NavButton;
