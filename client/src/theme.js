const getTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' ? {
        main: 'rgba(0,0,0,1)',
      }
        : {
          main: 'rgba(8,9,11,1)',
        }),
    },
    background: {
      ...(mode === 'light' ? {
        default: 'rgba(255,255,255,1)',
        paper: 'rgba(240,240,240,1)',
      }
        : {
          default: 'rgba(31,32,34,1)',
          paper: 'rgba(8,9,11,1)',
        }),
    },
  },
  typography: {
    caption: {
      // color: mode === 'light' ? '#000' : '#fff',
      // color: 'rgba(145,145,135,1)',
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      // fontSize: '0.8rem',
      // fontWeight: '700',
      transition: 'all 0.5s ease-in-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '0px',
        bottom: '0px',
        width: '0%',
        height: '5%',
        borderBottom: '2px solid #000',
        transition: 'all 0.3s ease-in-out',
      },
      '&:hover::before': {
        width: '100%',
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '56px 8px 0 8px',
          '@media (min-width: 600px)': {
            padding: '56px 10px 0 10px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'rgba(0,100,0,0.5)',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.5)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0,0,0,0.1)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(0,100,0,0.5)',
            },
          },
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: '10px',
          alignItems: 'center',
        },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          background: 'inherit',
          '.MuiMobileStepper-progress': {
            width: '100%',
            height: '15px',
          },
          '.MuiLinearProgress-bar': {
            background: 'rgba(0,0,0,1)',
            transition: 'transform 0.3s linear',
          },
          '.MuiLinearProgress-colorPrimary': {
            background: 'rgba(255,255,255, 1)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '0px',
            bottom: '0px',
            width: '100%',
            height: '0%',
            borderRight: mode === 'light' ? '5px solid #000' : '5px solid #fff',
            transition: 'all 0.3s ease-in-out',
          },
          '&:hover::before': {
            height: '100%',
          },
        },
      },
    },
  },
});

export default getTheme