import { GithubPicker } from 'react-color'
import reactCSS from 'reactcss'

export default function ColorPicker({ displayColorPicker, changeColor, color }) {
  const styles = reactCSS({
    'default': {
      popover: {
        position: 'absolute',
        zIndex: '2',
        bottom: 20,
        left: -40
      },
      box: {
        position: 'relative'
      }
    }
  })
  return (
    <div>
      {displayColorPicker &&
        <div style={styles.box}>
          <div style={styles.popover}>
            <GithubPicker width='220px' triangle='hide' color={color} onChangeComplete={changeColor} />
          </div>
        </div>
      }
    </div>
  )
}