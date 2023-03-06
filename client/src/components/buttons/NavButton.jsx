import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function NavButton({ title, nav, action }) {
  return (
    <Button
      onClick={action}
      component={Link}
      to={nav}
      color="primary"
      sx={{
        cursor: 'pointer',
        // background: 'rgba(0,0,0,0.5)',
        // '&:hover': {
        //   background: 'rgba(0,0,0,0.2)'
        // }

        // transition: 'all 0.5s ease-in-out',
        // padding: '0 10px',
        // '&::before': {
        //   content: '""',
        //   position: 'absolute',
        //   left: '0px',
        //   bottom: '0px',
        //   width: '0%',
        //   height: '5%',
        //   borderBottom: '2px solid #fff',
        //   transition: 'all 0.3s ease-in-out',
        // },
        // '&:hover::before': {
        //   width: '100%',
        // },
      }}
    >
      {title}
    </Button>
  );
}
export default NavButton;
