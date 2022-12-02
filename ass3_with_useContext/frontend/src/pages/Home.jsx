import React from 'react';
// import { apiCall } from '../Util/Helper';
import { useContext, Context } from '../context';

import Box from '@mui/material/Box';
import Listings from '../components/Listings';

export default function Home () {
  const { getters } = useContext(Context);
  // const [listings, setListings] = React.useState([]);
  // const fetchListings = async () => {
  //   const data = await apiCall('/listings', 'GET', null, null);
  //   setListings(data.listings);
  // };
  // fetchListings();
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
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <Listings user={getters.user}/>
      </Box>
      {/* <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav> */}
    </>
  );
}
