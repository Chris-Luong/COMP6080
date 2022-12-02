import React from 'react';
import Navbar from './Navbar';

import { useContext, Context } from '../context';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../Util/ProtectedRoute';

import {
  Routes,
  Route,
  // useNavigate,
} from 'react-router-dom';

export default function Site () {
  const { getters, setters } = useContext(Context);
  // const [token, setToken] = React.useState(null);

  // React.useEffect(() => {
  //   const lsToken = localStorage.getItem('token');
  //   if (lsToken) {
  //     setters.setToken(lsToken);
  //     setToken(lsToken);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (token !== null) {
  //     useNavigate('/dashboard');
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
      <Routes>
        <Route path="/login" element={<Login setTokenFn={setters.setToken} />} />
        <Route path="/register" element={<Register setTokenFn={setters.setToken} />} />
        <Route element={<ProtectedRoute token={getters.token}/>}>
          <Route path="/dashboard" element={<Dashboard token={getters.token}/>} />
        </Route>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<h1>{"There's nothing here: 404!"}</h1>} />
        {/* <Route path="/listing/new">
          <ListingNew token={token} />
        </Route> */}
       </Routes>
    </>
  );
}
