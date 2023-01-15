import { TextField, Box, Button } from "@mui/material"
import { useState } from "react"
import SignUpDialog from './SignUpDialog'
import loginServices from "../../services/loginServices"
import protoServices from "../../services/protoServices"

export default function Register({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Signup Dialog state
  const [open, setOpen] = useState(false)
  const openSignUp = () => {
    setOpen(true)
  }
  const closeSignUp = () => {
    setOpen(false)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }
    try {
      const result = await loginServices.loginUser(user)
      window.localStorage.setItem('user', JSON.stringify(result.data))
      protoServices.setToken(result.data.token)
      setUser(result.data)
    } catch (error) {
      console.log(error.response.data.error)
    }

  }

  return (
    <div style={styles.container}>
      <Box>
        <Box style={styles.box}>
          <TextField
            value={username}
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            value={password}
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={openSignUp}>Signup</Button>
      </Box>
      <SignUpDialog open={open} setOpen={setOpen} closeSignUp={closeSignUp} />
    </div>
  )
}
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

  }
}

