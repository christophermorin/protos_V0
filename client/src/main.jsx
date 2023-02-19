import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import store from './store/store';

const theme = createTheme({
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
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
