import { Button, Box } from "@mui/material"

function PhotoCred({ unSplashSource, resetBackground }) {
  return (
    <Box
      display="flex"
      gap={1}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 100,
      }}

    // style={{ position: 'absolute', bottom: 16, right: 100 }}
    >
      <Button
        onClick={resetBackground}
      >
        New BG
      </Button>
      <Button>
        <a
          href={`${unSplashSource}`}
          target="none"
          style={{
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Image Source
        </a>
      </Button>
    </Box>
  )
}

export default PhotoCred