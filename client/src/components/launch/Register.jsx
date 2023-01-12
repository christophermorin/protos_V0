import { TextField, Box, Button } from "@mui/material"
import { useState } from "react"
import userServices from "../../services/userServices";
import SignUpDialog from "./SignUpDialog";

export default function Home({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [open, setOpen] = useState(false)

  const openSignUp = () => {
    setOpen(true)
  }

  const closeSignUp = () => {
    setOpen(false)
  }
  // const handleLogin = async () => {
  //   try {
  //     const results = await userServices.userLogIn({ username: username, password: password })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
        <Button onClick={() => handleLogin({ username: username, password: password })}>Login</Button>
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

