import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7b87b5',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4674',
    },
    background: {
      default: 'black',
      paper: '#f3f3f3',
    },
    h3: {
      default: 'red'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
