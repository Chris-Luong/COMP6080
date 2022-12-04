import PropTypes from 'prop-types';
import React from 'react';

import Box from '@mui/material/Box';
import Listings from '../components/Listings';

export default function Home (props) {
  return (
    <>
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Welcome to the Airbrb!</h2>
        <Listings token={props.token} user={props.user}/>
      </Box>
    </>
  );
}

Home.propTypes = {
  token: PropTypes.string,
  user: PropTypes.string,
}
