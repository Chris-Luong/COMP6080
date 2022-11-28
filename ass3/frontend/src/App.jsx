import React from 'react';
import Site from './components/Site';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import { Context, initialValue } from './context';
import { CssBaseline } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#019488',
      // dark: will be calculated from palette.primary.main,
    },
    secondary: {
      main: '#b93337',
      // contrastText: will be calculated to contrast with palette.secondary.main
    },
  },
});

function App () {
  const [token, setToken] = React.useState(initialValue.token);
  const getters = {
    token,
  };
  const setters = {
    setToken,
  };
  return (
    <Router>
      <Context.Provider value={{ getters, setters }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Site />
        </ThemeProvider>
      </Context.Provider>
    </Router>
  );
}

export default App;
