import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#c73f3f',
    },
    secondary: {
      main: '#e5d67e',
      light: '#ff4674',
    },
    text: {
      primary: '#000000',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </Provider>
  </React.StrictMode >,
)