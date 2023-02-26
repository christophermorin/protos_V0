import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import store from './store/store';

//e5e5e5

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' ? {
        main: 'rgba(0,0,0,1)'
      } :
        {
          main: 'rgba(0,0,0,1)'
        })
    },
    background: {
      ...(mode === 'light' ? {
        default: 'rgba(255,255,255,1)',
        paper: '#f8f8f8',
      }
        :
        {
          default: 'rgba(0,255,255,1)',
          paper: '#e5e5e5'
        })
    },
  },
  typography: {
    caption: {
      color: mode === 'light' ? '#000' : '#fff',
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '700',
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
            background: 'rgba(0, 155, 100, 0.5)',
            transition: 'transform 0.3s linear',
          },
          '.MuiLinearProgress-colorPrimary': {
            background: 'rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
})

const theme = createTheme(getDesignTokens('light'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
