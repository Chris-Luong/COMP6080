import PropTypes from 'prop-types';
import React from 'react';
import Listings from '../components/Listings';

import Btn from '../components/Btn';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import MainHeading from '../components/MainHeading';

export default function Dashboard (props) {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainHeading>
        Your listings
      </MainHeading>
      <Btn onClick={() => navigate('/listing/new')}>Create new listing</Btn>
      <Listings token={props.token} user={props.user}/>
    </Container>
  );
}

Dashboard.propTypes = {
  token: PropTypes.string,
  user: PropTypes.string,
};
