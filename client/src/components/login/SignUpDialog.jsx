import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ActionButton from '../buttons/ActionButton';
import { setNotification, resetNotification } from '../../reducers/notificationsReducer';
import userServices from '../../services/userServices';
import userStatsServices from '../../services/userStatsServices';

function SignUpDialog({ open, closeSignUp, setOpen }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch()

  const handleSignUp = async () => {
    if (confirmPassword !== password) {
      dispatch(setNotification({ title: 'Passwords must match', severity: 'error' }))
      dispatch(resetNotification())
      return;
    }
    const newUser = {
      username,
      email,
      password,
    };
    try {
      const userCreated = await userServices.userSignUp(newUser);
      await userStatsServices.createInitialStats({
        userId: userCreated.data.id,
        username: userCreated.data.username,
      });
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOpen(false);
      dispatch(setNotification({ title: 'User Created', severity: 'success' }))
      dispatch(resetNotification())
    } catch (error) {
      dispatch(setNotification({ title: error.response.data.error, severity: 'error' }))
      dispatch(resetNotification())
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeSignUp}
    >
      <Grid
        container
        direction="column"
        padding={5}
        gap={2}
        sx={{
          background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(11, 15, 20, 1) 90%)'
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Sign up!
        </Typography>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="standard"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="standard"
        />
        <TextField
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="standard"
        />
        <TextField
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          variant="standard"
        />
        <ActionButton title={'SignUp'} action={handleSignUp} />
      </Grid>
    </Dialog>
  );
}

SignUpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSignUp: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SignUpDialog;
