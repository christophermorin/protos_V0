import { Button, Box } from '@mui/material';
import ActionButton from '../buttons/ActionButton';

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
    >
      <ActionButton title="Reset BG" action={resetBackground} />
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
  );
}

export default PhotoCred;
