import Countdown from 'react-countdown';
import { Typography } from '@mui/material';

export default function ActiveTimer() {

  // Random component
  const Completionist = () => <span>Zero</span>

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <Typography>
          {hours} : {minutes} : {seconds}
        </Typography>
      )
    }
  };

  return (
    <div>
      <Countdown
        date={Date.now() + 5000}
        renderer={renderer}
      />
    </div>
  )
}