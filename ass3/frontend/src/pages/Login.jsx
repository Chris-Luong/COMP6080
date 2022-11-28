import PropTypes from 'prop-types';
import React from 'react';
import { apiCall } from '../Util/Helper';
import Register from './Register';
import DefaultLink from '../components/DefaultLink';
import FormField from '../components/FormField';

import { useContext, Context } from '../context';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import FullFormBtn from '../components/FullFormBtn';

const Login = (props) => {
  const navigate = useNavigate();
  const { setters } = useContext(Context);

  const loginBtn = async (email, password) => {
    const data = await
    apiCall('/user/auth/login', 'POST', { email, password }, null);
    console.log(data.token);
    props.setTokenFn(data.token);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('email') || !data.get('password')) {
      alert('Please fill in all required fields');
      return;
    }
    loginBtn(data.get('email'), data.get('password'));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormField
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormField
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography
              variant="body2"
              color="error.main"
              align="left"
              {...props}
            >
              * Required
            </Typography>
            <FullFormBtn
            >
              Login
            </FullFormBtn>
            <DefaultLink
              onClick={() => navigate('/register')}
            >
              {"Don't have an account? Register here"}
            </DefaultLink>
          </Box>
        </Box>
        <Routes>
          <Route
            path="/register"
            element={<Register setTokenFn={setters.setToken} />}
          />
      </Routes>
      </Container>
    </>
  );
}

export default Login;

Login.propTypes = {
  setTokenFn: PropTypes.func,
};
