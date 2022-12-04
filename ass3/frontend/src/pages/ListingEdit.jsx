import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../components/Btn';
import FormField from '../components/FormField';
import FullFormBtn from '../components/FullFormBtn';
import { apiCall } from '../Util/Helper';

import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import AddHomeIcon from '@mui/icons-material/AddHome';
// import Listings from '../components/Listings';
// import FullFormBtn from '../components/FullFormBtn';
// import { Avatar, Box, Container, Typography } from '@mui/material';
// import FormField from '../components/FormField';

const ListingEdit = (props) => {
  const [newListingTitle, setNewListingTitle] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([]);
  const navigate = useNavigate();

  const newListing = async (args) => {
    const data = await apiCall('/listings/' + props.listingId,
      'POST', { ...args }, props.token);
    console.log('newListing data is ' + data);
    navigate('/dashboard');
  };

  React.useEffect(() => {
    console.log(bedrooms)
  }, [bedrooms])

  const isValidDetails = (
    title,
    street,
    city,
    state,
    postcode,
    country,
    price,
    thumbnail,
    propertyType,
    numBathrooms,
    // numBedrooms,
    // bedroomProps,
    amenities,
  ) => {
    if (
      !title ||
      !street ||
      !city ||
      !state ||
      !postcode ||
      !country ||
      !price ||
      !thumbnail ||
      !propertyType ||
      !numBathrooms ||
      // !numBedrooms ||// need to add a field for this
      // !bedroomProps ||
      !amenities
    ) {
      return false;
    }
    // else if (numBedrooms !== bedroomProps.length) {
    //   alert('Number of bedrooms does not match number of bedroom properties');
    // }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title');
    const street = data.get('street');
    const city = data.get('city');
    const state = data.get('state');
    const postcode = data.get('postcode');
    const country = data.get('country');
    const price = data.get('price');
    const thumbnail = data.get('thumbnail');
    const propertyType = data.get('propertyType');
    const numBathrooms = data.get('numBathrooms');
    const amenities = data.get('amenities');

    if (!isValidDetails(
      title,
      street,
      city,
      state,
      postcode,
      country,
      price,
      thumbnail,
      propertyType,
      numBathrooms,
      // data.get('numBedrooms'),
      // data.get('bedroomProps'),
      amenities,
    )) {
      alert('Please fill in all required fields');
      return;
    }
    const listingDetails = {
      title,
      address: {
        street,
        city,
        state,
        postcode,
        country,
      },
      price,
      thumbnail,
      metadata: {
        propertyType,
        numBathrooms,
        bedroomProps: [ // will need to change this
          {
            numBeds: 2,
            isMaster: false,
          }
        ],
        amenities,
        // numBeds: 3,
        // SVGRating: null,
        // numReviews: 0,
        // isPublished: false,
      },
    };
    newListing(listingDetails);
  };

  return (
    <>
      <Container maxWidth="lg">
        Listing new page!<br />
        <input type="text" value={newListingTitle} onChange={(e) => setNewListingTitle(e.target.value)} />
        <br />
        <Btn onClick={() => newListing({
          title: newListingTitle,
          address: { address: '1/101 Kensington Street, Kensington, NSW' },
          price: 350,
          thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA90lEQVR4Ae3UJ4PDMAyG4fv1HxMTK6tRWYJ6zCxMLCxFFxQzsbDubVexb68X68m0/TQW9mngH2izYICdhDzgCcfYZ4BhjqtmYQoMjJtYJ0CFu5wNBFGdCTgGzgIvSNQZoEmBxgB1CtRfCnwKeAOsSr+SEqJ4jIH5TN4EytEN1ARjT7iJ+qn90FI0b4MxMM7NQ9aeFncc77JPDV210us3OZdUlgtm7KOZW7bBAtrMEeUkPABDRUhXhQRQT3icj0DPMONwC4QwEck1EGQkF9Aiq+4EBs4DFI6gQmbuAFbIrtsDlw/cDgwoSLdASoBswXMJWG5BXQLqcQOKfxhbw9MxtAAAAABJRU5ErkJggg==',
          metadata: {
            propertyType: 'House',
            numBathrooms: 2,
            bedroomProps: [
              {
                numBeds: 2,
                isMaster: false,
              }
            ],
            amenities: ['Air Conditioning', 'Kitchen'],
          },
        })}>Save changes</Btn>
      </Container>

      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddHomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit listing
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormField
              required
              id="title"
              label="Listing Title"
              type="text"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <Typography component="h5" variant="h5">
              <br />Address
            </Typography>
            <FormField
              required
              name="street"
              label="Street"
              type="text"
              id="street"
              autoComplete="1 George Street"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  name="city"
                  label="City"
                  type="text"
                  id="city"
                  autoComplete="Sydney"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  name="state"
                  label="State"
                  type="text"
                  id="state"
                  autoComplete="NSW"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  name="postcode"
                  label="Postcode"
                  type="number"
                  id="postcode"
                  autoComplete="2000"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  name="country"
                  label="Country"
                  type="text"
                  id="country"
                  autoComplete="Australia"
                />
              </Grid>
            </Grid>
            <FormField
              required
              name="price"
              label="Price"
              type="number"
              id="price"
              autoComplete="200"
            />
            <FormField
              required
              name="thumbnail"
              label="Thumbnail"
              type="text"
              id="thumbnail"
              autoComplete="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA90lEQVR4Ae3UJ4PDMAyG4fv1HxMTK6tRWYJ6zCxMLCxFFxQzsbDubVexb68X68m0/TQW9mngH2izYICdhDzgCcfYZ4BhjqtmYQoMjJtYJ0CFu5wNBFGdCTgGzgIvSNQZoEmBxgB1CtRfCnwKeAOsSr+SEqJ4jIH5TN4EytEN1ARjT7iJ+qn90FI0b4MxMM7NQ9aeFncc77JPDV210us3OZdUlgtm7KOZW7bBAtrMEeUkPABDRUhXhQRQT3icj0DPMONwC4QwEck1EGQkF9Aiq+4EBs4DFI6gQmbuAFbIrtsDlw/cDgwoSLdASoBswXMJWG5BXQLqcQOKfxhbw9MxtAAAAABJRU5ErkJggg=="
            />
            <Typography
              variant="body2"
              color="grey"
              align="left"
            >
              Please enter thumbnail a base64 string
            </Typography>
            <Typography component="h5" variant="h5">
              <br />Property details
            </Typography>
            <FormField
              required
              name="propertyType"
              label="Type of property"
              type="text"
              id="propertyType"
              autoComplete="House"
            />
            <FormField
              required
              // onChange={onChange} // update the numBedrooms field to use
              name="numBathrooms"
              label="Bathrooms"
              type="number"
              id="numBathrooms"
              autoComplete="3"
            />
              {bedrooms.map((bedroom, index) => {
                return (
                  <Grid container spacing={2} key={index} className="bedroom-input">
                    <Grid item xs={12} sm={6}>
                      <FormField
                        required
                        onChange={(event) => {
                          console.log('index is ', index);
                          const newBedroomProps = [...bedrooms];
                          newBedroomProps[index].numBeds = event.target.value;
                          setBedrooms(newBedroomProps);
                        }}
                        name="numBeds"
                        label="Beds"
                        type="number"
                        id="numBeds"
                        autoComplete="2000"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        required
                        onChange={(event) => {
                          const newBedroomProps = [...bedrooms];
                          newBedroomProps[index].bedroomType = event.target.value;
                          setBedrooms(newBedroomProps);
                        }}
                        name="bedroomType"
                        label="Type of bedroom"
                        type="text"
                        id="bedroomType"
                        autoComplete="Australia"
                      />
                      <Typography
                        variant="body2"
                        color="grey"
                        align="left"
                      >
                        E.g. Master
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })}
            <Btn color="blue" onClick={() => {
              console.log('add bedroom');
              const newBedroomProps = [...bedrooms];
              newBedroomProps.push('');
              setBedrooms(newBedroomProps);
            }}>
              Add more bedrooms
            </Btn>
            <FormField
              required
              name="amenities"
              label="Amenities"
              type="text"
              id="amenities"
              autoComplete="Air conditioner,Kitchen"
            />
            <Typography
              variant="body2"
              color="grey"
              align="left"
            >
              Please enter amenities as comma separated values (e.g.
              Air Conditioning,Kitchen)
            </Typography>
            <Typography
              variant="body2"
              color="error.main"
              align="left"
            >
              * Required
            </Typography>
            <FullFormBtn
            >
              Save changes
            </FullFormBtn>
            {/* <DefaultLink
              onClick={() => navigate('/login')}
            >
              Have an account already? Sign in here
            </DefaultLink> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ListingEdit;

ListingEdit.propTypes = {
  token: PropTypes.string,
  user: PropTypes.string,
  listingId: PropTypes.string,
};
