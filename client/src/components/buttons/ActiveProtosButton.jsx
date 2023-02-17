import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.module.css';

function ActiveProtosButton({ title, action, buttonType }) {
  const [buttonActive, setButtonActive] = useState(false);
  const handleStyle = () => {
    setButtonActive(!buttonActive);
  };
  return (
    <div
      className={` ${buttonActive ? styles.activeProtoButtonSelected : styles.activeProtoButton}`}

      onClick={() => {
        action();
        handleStyle();
      }}
    >
      {/* <span style={buttonActive ? { padding: '2px 0', borderTop: '2px solid black', borderBottom: '2px solid black' } : null}>{title}</span> */}
      < span style={{ position: 'relative', zIndex: 3 }}> {title}</span >
    </div >
  );
}

export default ActiveProtosButton;
