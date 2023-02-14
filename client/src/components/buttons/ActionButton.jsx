import PropTypes from 'prop-types';
import styles from './Buttons.module.css'

function ActionButton({ title, action, buttonType }) {
  return (
    <div
      className={styles.actionButton}
      onClick={action}
      style={buttonType === 'secondary' ? {
        boxShadow: '0 0 2px 2px rgba(255,0,0,0.6)'
      } : null}
    >

      <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
    </div >
  );
}

export default ActionButton;