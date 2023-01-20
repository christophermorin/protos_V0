import { Button } from '@mui/material'
export default function StylishButton({ title, action, color }) {
  return (
    <Button
      variant="contained"
      onClick={action}
      color={color}
    >
      {title}
    </Button>
  )
}