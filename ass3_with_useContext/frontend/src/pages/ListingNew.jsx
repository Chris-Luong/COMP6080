// import PropTypes from 'prop-types';
import React from 'react';
import Btn from '../components/Btn';
import { apiCall } from '../Util/Helper';
import { useContext, Context } from '../context';

import Listings from '../components/Listings';

const ListingNew = () => {
  const [newListingTitle, setNewListingTitle] = React.useState('');
  const { getters } = useContext(Context);

  const newListing = async (args) => {
    console.log(getters.token)
    const data = await apiCall('/listings/new', 'POST', { ...args }, getters.token);
    console.log('newListing data is ' + data);
    console.log('hi');
  };

  return (
    <>
      <hr />
      Listing new page!<br />
      <input type="text" value={newListingTitle} onChange={(e) => setNewListingTitle(e.target.value)} />
      <br />
      <Btn onClick={() => newListing({
        title: newListingTitle,
        address: { street: 'Murphy' },
        price: 350,
        thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA90lEQVR4Ae3UJ4PDMAyG4fv1HxMTK6tRWYJ6zCxMLCxFFxQzsbDubVexb68X68m0/TQW9mngH2izYICdhDzgCcfYZ4BhjqtmYQoMjJtYJ0CFu5wNBFGdCTgGzgIvSNQZoEmBxgB1CtRfCnwKeAOsSr+SEqJ4jIH5TN4EytEN1ARjT7iJ+qn90FI0b4MxMM7NQ9aeFncc77JPDV210us3OZdUlgtm7KOZW7bBAtrMEeUkPABDRUhXhQRQT3icj0DPMONwC4QwEck1EGQkF9Aiq+4EBs4DFI6gQmbuAFbIrtsDlw/cDgwoSLdASoBswXMJWG5BXQLqcQOKfxhbw9MxtAAAAABJRU5ErkJggg==',
        metadata: {},
      })}>Create!</Btn>
      <hr />
      Current listings:<br />
      <Listings user={getters.user}/>
    </>
  );
};

export default ListingNew;

// ListingNew.propTypes = {
//   token: PropTypes.string,
// };
