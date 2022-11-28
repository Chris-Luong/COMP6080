import PropTypes from 'prop-types';

import React from 'react';
import Button from '@mui/material/Button';

const Btn = (props) => {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
    {props.children}
    </Button>
  );
};

export default Btn;

Btn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
