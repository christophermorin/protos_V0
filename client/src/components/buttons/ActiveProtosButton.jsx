import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.module.css';
import { Box, Typography, } from '@mui/material';

function ActiveProtosButton({ title, action }) {
  const [buttonActive, setButtonActive] = useState(false);
  const handleStyle = () => {
    setButtonActive(!buttonActive);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      onClick={action}
      sx={{
        marginLeft: 1,
        marginRight: 1,
        width: '100%',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '5px',
        padding: '5px',
        '&:hover': {
          background: 'rgba(0,0,0,0.5)'
        }
      }}
    >
      <Typography
        variant="caption"
      >
        {title}
      </Typography>
    </Box>
    // <div
    //   className={` ${buttonActive ? styles.activeProtoButtonSelected : styles.activeProtoButton}`}

    //   onClick={() => {
    //     action();
    //     handleStyle();
    //   }}
    // >
    //   <span style={{ position: 'relative', zIndex: 3 }}>
    //     {title}
    //   </span>
    // </div>
  );
}

export default ActiveProtosButton;
