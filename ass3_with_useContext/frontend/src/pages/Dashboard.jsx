import PropTypes from 'prop-types';
import React from 'react';
import ListingNew from './ListingNew';

import Box from '@mui/material/Box';

export default function Dashboard (props) {
  console.log('dashboard token is ', props.token);
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
        <h2>Your listings</h2>
        <p>
          That feels like an existential question, dont you
          think?
        </p>
        <br />
        {/* Token: {props.token} */}
        <ListingNew />
      </Box>
    </>
  );
}

Dashboard.propTypes = {
  token: PropTypes.string,
};
