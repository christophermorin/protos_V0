import { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import userServices from "../../services/userServices";

export default function SignUpDialog({ open, closeSignUp, setOpen }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async () => {
    // Needs valid checks
    try {
      const newUser = {
        username: username,
        email: email,
        password: password
      }
      const results = await userServices.createUser(newUser)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <Dialog
      open={open}
      onClose={closeSignUp}
    >
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="standard" />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        variant="standard" />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="standard" />
      <TextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        variant="standard" />
      <Button onClick={handleSignUp}>SignUp</Button>
    </Dialog>
  )
}