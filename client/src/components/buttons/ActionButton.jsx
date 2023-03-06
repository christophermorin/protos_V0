import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import styles from './Buttons.module.css';

function ActionButton({ title, action, buttonType }) {
  return (
    <Button
      // className={styles.actionButton}
      onClick={action}
      style={{
        // border: '1px solid blue',
        background: 'blue',
      }}
    >
      <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
    </Button>
  );
}

export default ActionButton;
