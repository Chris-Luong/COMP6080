// import PropTypes from 'prop-types';
import React from 'react';
import Btn from '../components/Btn';
import { apiCall } from '../Util/Helper';
import { useContext, Context } from '../context';

const ListingNew = () => {
  const [listings, setListings] = React.useState([]);
  const [newListingTitle, setNewListingTitle] = React.useState('');
  const { getters } = useContext(Context);

  const newListing = async (args) => {
    console.log(getters.token)
    const data = await apiCall('/listings/new', 'POST', { args }, getters.token);
    console.log('newListing data is ' + data);
    // if (!data.error) {
    fetchListings();
    // }
  };

  /**
   * Get all AirBrB listings' meta-data
   */
  const fetchListings = async () => {
    const data = await apiCall('/listings', 'GET', null, null);
    console.log('fetchListings data is ', data);
    setListings(data.listings);
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <hr />
      Current listings:<br />
      {listings.map((listing, idx) => {
        console.log(listing);
        // Added key={idx} because of eslint formatting issue
        return (
          <div key={idx}>
            {listing.title}<br />
            <img src={listing.thumbnail} />
          </div>
        )
      })}
      <hr />
      Listing new page!<br />
      <input type="text" value={newListingTitle} onChange={(e) => setNewListingTitle(e.target.value)} />
      <br />
      <Btn onClick={() => newListing({
        title: newListingTitle,
        address: { street: 'Murphy' },
        price: 350,
        thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        metadata: {},
      })}>Create!</Btn>
    </>
  );
};

export default ListingNew;

// ListingNew.propTypes = {
//   token: PropTypes.string,
// };
