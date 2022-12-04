import PropTypes from 'prop-types';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({
  token,
  children,
}) => {
  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  return children || <Outlet />;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  token: PropTypes.string,
  children: PropTypes.object,
}
