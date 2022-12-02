import PropTypes from 'prop-types';

import React from 'react';
import Button from '@mui/material/Button';

const FullFormBtn = (props) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
    {props.children}
    </Button>
  );
};

export default FullFormBtn;

FullFormBtn.propTypes = {
  children: PropTypes.string,
};
