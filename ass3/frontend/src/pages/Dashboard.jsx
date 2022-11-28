import React from 'react';
import ListingNew from './ListingNew';

import Box from '@mui/material/Box';

export default function Dashboard () {
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
        {/* Token: {token} */}
        <ListingNew />
      </Box>
    </>
  );
}
