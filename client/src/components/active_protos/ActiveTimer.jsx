import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, timerState }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), autoStart: false, });

  useEffect(() => {
    if (timerState) {
      resume()
    }
    else if (!timerState) {
      pause()
    }
  }, [timerState])

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ background: 'lightgrey', padding: '0 4px', fontWeight: '500' }}>
        {/* <span>{hours}</span>
        : */}
        {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}
        :
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </div>
    </div>
  );
}

export default function ActiveTimer({ timerState, jobTimer }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + jobTimer * 60);
  return (
    <div>
      <MyTimer expiryTimestamp={time} timerState={timerState} />
    </div>
  );
}