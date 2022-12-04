import PropTypes from 'prop-types';
import React from 'react';
import { apiCall } from '../Util/Helper';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Listing from './Listing';

/**
 * Get listings
 */
const Listings = (props) => {
  const [listings, setListings] = React.useState([]);
  const [isDeleted, setIsDeleted] = React.useState(false);

  const fetchListings = async () => {
    const data = await apiCall('/listings', 'GET', null, null);
    data.listings.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase())
      ? 1
      : ((b.title > a.title) ? -1 : 0));
    setListings(data.listings);
  };

  console.log('user is ', props.user);

  React.useEffect(() => {
    fetchListings();
  }, []);

  React.useEffect(() => {
    fetchListings();
    setIsDeleted(false);
  }, [isDeleted]);

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={5}>
        {listings.map((listing, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <Listing
              id={listing.id}
              token={props.token}
              user={props.user}
              owner={listing.owner}
              title={listing.title}
              price={listing.price}
              thumbnail={listing.thumbnail}
              reviews={listing.reviews}
              isDeletedFn={setIsDeleted}
            />
          </Grid>
        ))}
      </Grid>
    </Container>

  );
};

export default Listings;

Listings.propTypes = {
  token: PropTypes.string,
  user: PropTypes.string,
}
