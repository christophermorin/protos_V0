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
      onClick={() => {
        action();
        handleStyle();
      }}
      sx={{
        marginLeft: 1,
        marginRight: 1,
        width: '100%',
        background: !buttonActive ? '#1f2937a1' : '#1f2937',
        borderRadius: '5px',
        padding: '5px',
        '&:hover': {
          background: '#1f2937'
        },
      }}
    >
      <Typography
        variant="caption"
      >
        {title}
      </Typography>
    </Box>
  );
}

export default ActiveProtosButton;
