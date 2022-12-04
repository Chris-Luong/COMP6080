import React from 'react';
import Site from './components/Site';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

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
      // light: '#e3242a',
      main: '#b93337',
      // contrastText: will be calculated to contrast with palette.secondary.main
    },
    grey: {
      main: '##6e6e6e'
    },
    blue: {
      main: '#1976d2',
      contrastText: '#fff',
    },
  },
});

function App () {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Site />
      </ThemeProvider>
    </Router>
  );
}

export default App;
