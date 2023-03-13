const getTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: 'rgba(0,0,0,0.8)',
    },
    background: {
      ...(mode === 'light' ? {
        default: 'rgb(0,0,0,1)',
        paper: '#1f2937a1',
      }
        : {
          default: 'rgba(18,18,18,1)',
          paper: 'rgba(255,255,255,0.1)',
        }),
    },
    text: {
      primary: 'rgba(255,255,255,1)',
    },
  },
  typography: {
    caption: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
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
          background: '#cad4e1a1',
          color: '#e5f1f3',
          '& label.Mui-focused': {
            color: '#e5f1f3',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.5)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255,255,255,1)',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
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
            background: 'rgba(121,207,233,1)',
            transition: 'transform 0.3s ease-in-out',
          },
          '.MuiLinearProgress-colorPrimary': {
            background: '#1f2937e2',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          background: '#1f29372e',
          transition: 'all 0.5s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '0px',
            bottom: '0px',
            width: '100%',
            height: '0%',
            borderRight: '5px solid #fff',
            transition: 'all 0.3s ease-in-out',
          },
          '&:hover::before': {
            height: '100%',
          },
          '&:hover': {
            background: '#1f2937',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1f29372e',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#1f2937',
          color: '#fff',
          '&:hover': {
            background: 'blue',
          },
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: '#fff',
          color: '#000',
          '&:hover': {
            background: 'rgba(255,255,255,0.5)',
          },
        },
      },
    },
  },
});

export default getTheme;
