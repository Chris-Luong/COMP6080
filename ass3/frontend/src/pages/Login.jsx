import PropTypes from 'prop-types';
import React from 'react';
import { apiCall } from '../Util/Helper';
import DefaultLink from '../components/DefaultLink';
import FormField from '../components/FormField';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  useNavigate,
} from 'react-router-dom';
import FullFormBtn from '../components/FullFormBtn';

const Login = (props) => {
  const navigate = useNavigate();

  const loginBtn = async (email, password) => {
    const data = await
    apiCall('/user/auth/login', 'POST', { email, password }, null);
    if (!data) {
      return;
    }
    console.log(data.token);
    props.setTokenFn(data.token);
    localStorage.setItem('token', data.token);
    props.setUserFn(email);
    localStorage.setItem('user', email);
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
              type="email"
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
      </Container>
    </>
  );
}

export default Login;

Login.propTypes = {
  setTokenFn: PropTypes.func,
  setUserFn: PropTypes.func,
};
