import PropTypes from 'prop-types';
import styles from './Buttons.module.css';

function ProtoButton({ title, action, buttonType }) {
  return (
    <div
      className={styles.protoButton}
      onClick={action}
    >
      <span>{title}</span>
    </div >
  );
}

export default ProtoButton;
