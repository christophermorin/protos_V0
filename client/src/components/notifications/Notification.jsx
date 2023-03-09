import { Alert, Zoom } from "@mui/material"

function Notification({ title, severity }) {
  return (
    <Zoom
      direction="left"
      in
      sx={{
        position: 'absolute',
        bottom: 100,
        right: 16,
      }}
    >
      <Alert
        severity={severity}
        variant='filled'
      >
        {title}
      </Alert>
    </Zoom>
  )
}

export default Notification;
