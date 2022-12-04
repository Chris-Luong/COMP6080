import React from 'react';
import Navbar from './Navbar';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ListingNew from '../pages/ListingNew';
import ProtectedRoute from '../Util/ProtectedRoute';

import { apiCall } from '../Util/Helper';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import ListingEdit from '../pages/ListingEdit';

export default function Site () {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const logout = () => {
    apiCall('/user/auth/logout', 'POST', null, token)
      .then(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      });
  };

  React.useEffect(() => {
    const lsToken = localStorage.getItem('token');
    const lsUser = localStorage.getItem('user');
    if (lsToken && lsUser) {
      setToken(lsToken);
      setUser(lsUser);
    }
  }, []);

  React.useEffect(() => {
    if (token !== null && user !== null) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <>
      <Navbar token={token} user={user} logoutFn={logout}/>
      <Routes>
        <Route path="/login" element={<Login setTokenFn={setToken} setUserFn={setUser} />} />
        <Route path="/register" element={<Register setTokenFn={setToken} setUserFn={setUser} />} />
        <Route element={<ProtectedRoute token={token}/>}>
          <Route path="/dashboard" element={<Dashboard token={token} user={user}/>} />
        </Route>
        <Route path="/" element={<Home token={token} user={user}/>}/>
        <Route path="*" element={<h1>{"There's nothing here: 404!"}</h1>} />
        <Route path="/listing/new" element={<ListingNew token={token} />} />
        <Route path="/listing/edit/:listing" element={<ListingEdit token={token} />} />
       </Routes>
    </>
  );
}
