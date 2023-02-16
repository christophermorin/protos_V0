import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Buttons.module.css';

function NavButton({ title, nav, action }) {
  return (
    <div className={styles.navButton} onClick={action}>
      <Link to={nav}>
        <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
      </Link>
    </div>
  );
}
export default NavButton;
