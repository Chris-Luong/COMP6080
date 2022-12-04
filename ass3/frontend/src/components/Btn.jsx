import PropTypes from 'prop-types';

import React from 'react';
import Button from '@mui/material/Button';

const Btn = (props) => {
  const variant = props.variant ? props.variant : 'contained';
  const color = props.color ? props.color : 'primary';
  const size = props.size ? props.size : 'medium';
  return (
    <Button
      onClick={props.onClick}
      variant={variant}
      color={color}
      size={size}
      sx={{ mt: 3, mb: 2 }}
    >
    {props.children}
    </Button>
  );
};

export default Btn;

Btn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};
