const getTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      // ...(mode === 'light' ? {
      main: 'rgba(0,0,0,0.8)',
      // }
      //   : {
      //     main: 'rgba(25,118,210,1)',
      //   }),
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
          background: 'rgba(76, 98, 126, 1)',
          color: '#fff',
          '& label.Mui-focused': {
            color: 'rgba(255,255,255,0.8)',
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
          color: 'rgba(255,255,255,0.5)',
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
            background: 'rgba(0,0,255,1)',
            transition: 'transform 0.3s linear',
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
            background: '#1f29372e',
          },
        },
      },
    },
  },
});

export default getTheme;
