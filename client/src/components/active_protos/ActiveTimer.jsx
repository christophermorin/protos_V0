import Countdown, { zeroPad } from 'react-countdown';
import { Typography } from '@mui/material';

export default function ActiveTimer({ timer }) {
  // Random component
  const Completionist = () => <Typography sx={{
    fontWeight: 'bold',
    fontSize: 14,
    background: 'lightgrey',
    padding: '0 5px'
  }}>
    00:00
  </Typography>

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <Typography sx={{
          fontWeight: 'bold',
          fontSize: 14,
          background: 'lightgrey',
          padding: '0 5px'
        }}>
          {hours}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </Typography>
      )
    }
  };

  return (
    <div>
      <Countdown
        date={Date.now() + timer * 60000}
        renderer={renderer}
        autoStart={false}
      />
    </div>
  )
}