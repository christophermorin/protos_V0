import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import reactCSS from 'reactcss';

function ColorPicker({ displayColorPicker, changeColor, color }) {
  const styles = reactCSS({
    default: {
      popover: {
        position: 'absolute',
        zIndex: '2',
        bottom: 10,
        left: -220,
      },
      box: {
        position: 'relative',
      },
    },
  });
  return (
    <div>
      {displayColorPicker
        && (
          <div style={styles.box}>
            <div style={styles.popover}>
              <GithubPicker width="220px" triangle="hide" color={color} onChangeComplete={changeColor} />
            </div>
          </div>
        )}
    </div>
  );
}

ColorPicker.propTypes = {
  displayColorPicker: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
  // color:
};

export default ColorPicker;
