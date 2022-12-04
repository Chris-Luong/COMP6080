import PropTypes from 'prop-types';

import React from 'react';
// import { apiCall } from '../Util/Helper';

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Btn from './Btn';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiCall, getListingDetails } from '../Util/Helper';

const Listing = (props) => {
  const {
    id,
    token,
    user,
    owner,
    title,
    propertyType,
    numBeds,
    numBathrooms,
    thumbnail,
    reviews,
    price,
    isDeletedFn,
  } = props;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const deleteListing = async (id, token) => {
    const data = await apiCall('/listings/' + id, 'DELETE', null, token);
    console.log('delete data is ', data)
    isDeletedFn(true);
  }
  const onDashboard = (pathname === '/dashboard');

  console.log(`user is ${user} and owner is 
    ${owner} price is ${price} and ${user === owner} and onDashboard ${onDashboard}`)
  console.log(pathname)
  if (onDashboard && user !== owner) {
    return null;
  }

  const listingDetails = Promise.resolve(getListingDetails(id))
    .then((data) => { return data });
  console.log(listingDetails)

  let renderCardContent = null;
  if (onDashboard) {
    renderCardContent =
    (<>
      <CardMedia
        component="img"
        height="256"
        sx={{
          // 16:9
          // pt: '56.25%',
        }}
        src={thumbnail}
        alt="listing-thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>
          {propertyType}<br />
          {numBeds}<br />
          {numBathrooms}<br />
          {reviews.length} reviews<br />
          ${price} per night<br />
        </Typography>
      </CardContent>
      <CardActions>
        <Btn
          onClick={() => deleteListing(id, token)}
          size="small"
          variant="text"
          color="secondary"
        >
          Delete
        </Btn>
        <Btn
          onClick={() => navigate('/listing/edit/' + id)}
          size="small"
          variant="text"
        >
          Edit
        </Btn>
      </CardActions>
    </>)
  } else if (user && user !== owner) {
    renderCardContent =
    (<>
      <CardMedia
        component="img"
        height="256"
        sx={{
          // 16:9
          // pt: '56.25%',
        }}
        src={thumbnail}
        alt="listing-thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>
          {reviews.length} reviews<br />
          ${price} per night<br /> {/** can remove this once other is read */}
        </Typography>
      </CardContent>
      <CardActions>
        <Btn
          onClick={() => console.log('Navigate to book listing page')}
          size="small"
          variant="text"
          color="blue"
        >
          Book
        </Btn>
      </CardActions>
    </>)
  } else {
    renderCardContent =
    (<>
      <CardMedia
        component="img"
        height="256"
        sx={{
          // 16:9
          // pt: '56.25%',
        }}
        src={thumbnail}
        alt="listing-thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>
          {reviews.length} reviews<br />
          ${price} per night<br /> {/** can remove this once other is read */}
        </Typography>
      </CardContent>
    </>)
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {renderCardContent}
    </Card>
  );
};

export default Listing;

Listing.propTypes = {
  // onClick: PropTypes.func,
  id: PropTypes.number,
  token: PropTypes.string,
  user: PropTypes.string,
  owner: PropTypes.string,
  title: PropTypes.string,
  propertyType: PropTypes.string,
  numBeds: PropTypes.number,
  numBathrooms: PropTypes.number,
  thumbnail: PropTypes.string,
  reviews: PropTypes.array,
  price: PropTypes.number,
  isDeletedFn: PropTypes.func,
  children: PropTypes.string,
};
