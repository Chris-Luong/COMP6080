import PropTypes from 'prop-types';

import React from 'react';
import Link from '@mui/material/Link';

const DefaultLink = (props) => {
  const {
    onClick,
    color,
    children
  } = props;

  return (
    <Link
      onClick={onClick}
      color={color}
      variant="body2"
      sx={{ cursor: 'pointer' }}
    >
      {children}
    </Link>
  );
};

export default DefaultLink;

DefaultLink.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.string,
};
