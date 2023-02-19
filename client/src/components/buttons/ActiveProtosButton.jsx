import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Buttons.module.css';

function ActiveProtosButton({ title, action }) {
  const [buttonActive, setButtonActive] = useState(false);
  const handleStyle = () => {
    setButtonActive(!buttonActive);
  };
  return (
    <div
      className={` ${buttonActive ? styles.activeProtoButtonSelected : styles.activeProtoButton}`}

      onClick={() => {
        action();
        handleStyle()
      }}
    >
      <span style={{ position: 'relative', zIndex: 3 }}>
        {title}
      </span>
    </div>
  );
}

export default ActiveProtosButton;
