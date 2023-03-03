import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import userServices from '../../services/userServices';
import userStatsServices from '../../services/userStatsServices';

function SignUpDialog({ open, closeSignUp, setOpen }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (confirmPassword !== password) {
      console.log('Passwords must match');
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
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeSignUp}
    >
      <Grid container direction="column" padding={5} gap={2}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Build your perfect day!
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
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="standard"
        />
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          variant="standard"
        />
        <Button onClick={handleSignUp}>SignUp</Button>
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
