import PropTypes from 'prop-types';
import React from 'react';
import { apiCall } from '../Util/Helper';
// import { useContext, Context } from '../context';

// import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Btn from './Btn';

const showHostedListings = (user, listings) => {
  console.log('Showing all listings for now');
  // return (
  //   <>
  //     <Btn>Hosted listings placeholder</Btn>
  //     {listings.map((listing, idx) => {
  //       console.log(listing);
  //       // Added key={idx} because of eslint formatting issue
  //       return (
  //         <div key={idx}>
  //           <h1>{listing.title}</h1><hr />
  //           <img src={listing.thumbnail} />
  //           <p>{listing.owner}</p>
  //           <p>{listing.address.street}</p>
  //           <p>${listing.price} per night</p>
  //           <Btn>Edit listing</Btn>
  //         </div>
  //       )
  //     })}
  //   </>
  // )
};

/**
 * Get all AirBrB listings' meta-data
 */
const Listings = (props) => {
  const [listings, setListings] = React.useState([]);
  // const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const fetchListings = async () => {
    const data = await apiCall('/listings', 'GET', null, null);
    console.log('Listings fetchListings data is ', data);
    setListings(data.listings);
  };
  console.log('listings is ', listings);
  console.log(props.user);
  const sortedListings =
    listings.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  console.log('sortedListings is ', sortedListings);

  // TODO: uncomment return statement to not show all listings
  if (props.user) {
    showHostedListings(props.user, sortedListings);
    // return;
  }
  React.useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      {/* {sortedListings.map((listing, idx) => {
        console.log('listing is ', listing);
        // Added key={idx} because of eslint formatting issue
        return (
          <div key={idx}>
            <h1>{listing.title}</h1><hr />
            <img src={listing.thumbnail} />
            <p>${listing.price} per night</p>
            <p>{listing.reviews.length} reviews</p>
          </div>
        )
      })} */}
        {/* <AppBar position="relative">
          <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        <> */}
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={5}>
            {sortedListings.map((listing, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    height="256"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                    }}
                    // image="https://source.unsplash.com/random"
                    src={listing.thumbnail}
                    alt="listing-thumbnail"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {listing.title}
                    </Typography>
                    <Typography>
                      ${listing.price} per night<br />
                      {listing.reviews.length} reviews<br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* </> */}
    </>
  );
};

export default Listings;

Listings.propTypes = {
  user: PropTypes.string,
}
