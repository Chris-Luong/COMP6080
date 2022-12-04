import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@mui/material'

const MainHeading = (props) => {
  return (
    <Typography
      component="h3"
      variant="h3"
      align="center"
      color="text.primary"
      gutterBottom
    >
      {props.children}
    </Typography>
  )
};

export default MainHeading;

MainHeading.propTypes = {
  children: PropTypes.string,
};
