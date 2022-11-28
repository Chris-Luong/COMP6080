import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const FormField = (props) => {
  return (<TextField
    margin="normal"
    required={props.required}
    fullWidth
    name={props.name}
    label={props.label}
    type={props.type}
    id={props.id}
    autoComplete={props.autoComplete}
    autoFocus={props.autoFocus}
  />)
}

export default FormField;

FormField.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
};
