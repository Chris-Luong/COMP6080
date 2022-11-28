import PropTypes from 'prop-types';
import React from 'react';
import { apiCall } from '../Util/Helper';
import Login from './Login';
import DefaultLink from '../components/DefaultLink';
import FormField from '../components/FormField';

import { useContext, Context } from '../context';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import FullFormBtn from '../components/FullFormBtn';

const isValidDetails = (email, name, password, passwordConfirm) => {
  const regex = /^(.+)@(.+)$/;

  if (!email || !password || !name || !passwordConfirm) {
    alert('Please fill in all required fields');
    return false;
  } else if (!email.match(regex)) {
    alert('Please enter a valid email e.g. john@gmail.com');
    return false;
  } else if (password !== passwordConfirm) {
    alert('Passwords do not match');
    return false;
  }
  return true;
};

const Register = (props) => {
  const navigate = useNavigate();
  const { setters } = useContext(Context);

  const registerBtn = async (email, password, name) => {
    const data = await
    apiCall('/user/auth/register', 'POST', { email, password, name }, null);
    console.log(data.token);
    props.setTokenFn(data.token);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirm = data.get('confirm-password');
    const name = data.get('name');

    if (!isValidDetails(email, name, password, passwordConfirm)) {
      return;
    }
    registerBtn(email, password, name);
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
            <FiberNewIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              autoComplete="new-password"
            />
            <FormField
              required
              name="confirm-password"
              label="Confirm password"
              type="password"
              id="confirm-password"
              autoComplete="repeat-password"
            />
            <FormField
              required
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
            />
            <Typography
              variant="body2"
              color="error.main"
              align="left" {...props}
            >
              * Required
            </Typography>
            <FullFormBtn
            >
              Register
            </FullFormBtn>
            <DefaultLink
              onClick={() => navigate('/login')}
            >
              Have an account already? Sign in here
            </DefaultLink>
          </Box>
        </Box>
        <Routes>
          <Route
            path="/login"
            element={<Login
            setTokenFn={setters.setToken} />}
          />
      </Routes>
      </Container>
    </>
  );
}

export default Register;

Register.propTypes = {
  setTokenFn: PropTypes.func,
};
