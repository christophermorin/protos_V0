import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import SignUpDialog from './SignUpDialog';
import loginServices from '../../services/loginServices';
import { setUserAuth } from '../../reducers/userAuthReducer';

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
      window.localStorage.setItem('user', JSON.stringify(userAuth));
      dispatch(setUserAuth(userAuth));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const styles = {
    container: {
      position: 'relative',
      top: '40%',
      width: '200px',
      margin: '0 auto',
    },
    box: {
      border: '1px solid black',
      padding: 10,
    },
  };

  return (
    <Grid container height="100%" justifyContent="center" alignItems="center" spacing={5} direction="column">
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
      <Grid container item direction="column" spacing={2} justifyContent="center" alignItems="center">
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
        <Grid item >
          <Button
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            onClick={openSignUp}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
      <SignUpDialog open={open} setOpen={setOpen} closeSignUp={closeSignUp} />
    </Grid>
  );
}

export default Register;
