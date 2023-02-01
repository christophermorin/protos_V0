import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, timerState }) {
  const {
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    pause,
    resume,
    // restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), autoStart: false });
  useEffect(() => {
    if (timerState) {
      resume();
    } else if (!timerState) {
      pause();
    }
  }, [timerState]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ background: 'lightgrey', fontWeight: '500' }}>
        {/* <span>{hours}</span>
        : */}
        {minutes < 10 ? (
          <span>
            0
            {minutes}
          </span>
        ) : <span>{minutes}</span>}
        :
        {seconds < 10 ? (
          <span>
            0
            {seconds}
          </span>
        ) : <span>{seconds}</span>}
      </div>
    </div>
  );
}

function ActiveTimer({ timerState, jobTimer }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + jobTimer * 60);
  return (
    <div>
      <MyTimer expiryTimestamp={time} timerState={timerState} />
    </div>
  );
}

MyTimer.defaultProps = {
  timerState: undefined,
};

MyTimer.propTypes = {
  expiryTimestamp: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  timerState: PropTypes.bool,
};

ActiveTimer.defaultProps = {
  timerState: undefined,
  jobTimer: 0,
};

ActiveTimer.propTypes = {
  timerState: PropTypes.bool,
  jobTimer: PropTypes.number,
};

export default ActiveTimer;
