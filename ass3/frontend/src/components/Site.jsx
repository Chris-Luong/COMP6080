import React from 'react';
import Navbar from './Navbar';

// import { useContext, Context } from '../context';

function Page () {
  // const { getters, setters } = useContext(Context);

  // React.useEffect(() => {
  //   const lsToken = getters.token;
  //   if (lsToken) {
  //     setters.setToken(lsToken);
  //   }
  // }, []);

  /**
   * TODO May not need this since home page should be default
   * The default home page should always show listings
   * So make a Home/ListingPage component that always shows the listings
   *  */
  return (
    <>
      <Navbar />
    </>
  );
}

export default Page;
