import React from 'react';
import PropTypes from 'prop-types';
import { CalendarIcon, CrossIcon } from "../svg";


const InputerIcon = ({ disabled, isFocused, onClear }) => {
  if (disabled) return null;
  if (isFocused) return (
    <CrossIcon onClick={onClear} />
  );
  return (
    <CalendarIcon />
  );
};

InputerIcon.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
};


export default InputerIcon;
