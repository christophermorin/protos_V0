import PropTypes from 'prop-types';
import styles from './Buttons.module.css';

function ActionButton({ title, action, buttonType }) {
  return (
    <div
      className={styles.actionButton}
      onClick={action}
      style={buttonType === 'secondary' ? {
        borderTop: '2px solid red',
        borderBottom: '2px solid red',

      } : {
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
      }}
    >
      <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
    </div>
  );
}

export default ActionButton;
