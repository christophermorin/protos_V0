import { useState } from 'react'
import { Box, Dialog, TextField, Button } from '@mui/material'
import userServices from '../../services/userServices'
export default function LoginDialog({ open }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async ({ rr }) => {
    try {
      const results = await userServices.userLogIn({ username: username, password: password })
      console.log(results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open}>
      <Box>
        <TextField
          value={username}
          label="Username"
          variant="standard"
          onChange={(e) => setUsername(e.target.value)} />
        <TextField
          value={password}
          label="Password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Click</Button>
      </Box>
    </Dialog>
  )
}