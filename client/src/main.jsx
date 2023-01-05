import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // backgroundColor: '#FAACA8,',
          // backgroundImage: `linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)`,
          backgroundImage: 'linear-gradient(122deg, rgba(218,216,240,1) 10%, rgba(233,230,247,1) 10%, rgba(201,219,226,1) 85%, rgba(217,231,233,1) 85%)',
        },
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#e5d67e',
      light: '#ff4674',
    },
    text: {
      primary: '#000000',
    },
    background: {
      // default: '#fafafa',
      paper: '#fff',

    },
    box: {
      primary: '#e5d67e'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode >,
)