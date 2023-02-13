import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './Buttons.module.css'

function HomeButton({ title }) {
  return (
    <div className={styles.homeButton}>
      <span style={{ position: 'relative', zIndex: 3 }}>{title}</span>
    </div>
  );
}



export default HomeButton;
