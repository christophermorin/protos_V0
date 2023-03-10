import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import SignUpDialog from './SignUpDialog';
import { setUserAuth } from '../../reducers/userAuthReducer';
import { setNotification, resetNotification } from '../../reducers/notificationsReducer';
import loginServices from '../../services/loginServices';
import userStatsServices from '../../services/userStatsServices';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const openSignUp = () => {
    setOpen(true);
  };
  const closeSignUp = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    const user = {
      username,
      password,
    };
    try {
      const userAuth = await loginServices.loginUser(user);
      await userStatsServices.checkUserStreak(userAuth.id);
      window.localStorage.setItem('user', JSON.stringify(userAuth));
      dispatch(setUserAuth(userAuth));
      dispatch(setNotification({ title: 'User Logged in', severity: 'success' }));
      dispatch(resetNotification());
    } catch (error) {
      dispatch(setNotification({
        title: error.response.data.error, severity: 'error',
      }));
      dispatch(resetNotification());
    }
  };

  return (
    <Grid
      container
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={2}
    >
      <Grid item>
        <Typography
          variant="h1"
        >
          Protos
        </Typography>
        <Typography
          variant="h6"
        >
          All things through consistency!
        </Typography>
      </Grid>
      <Grid
        container
        item
        direction="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          value={username}
          label="Username"
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          value={password}
          type="password"
          label="Password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Grid container gap={2} item justifyContent="center">
          <ActionButton title="Login" action={handleLogin} />
          <ActionButton title="Signup" action={openSignUp} />
        </Grid>
      </Grid>
      <SignUpDialog
        open={open}
        setOpen={setOpen}
        closeSignUp={closeSignUp}
      />
    </Grid>
  );
}

export default Register;
