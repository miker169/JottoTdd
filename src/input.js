import React from "react";
import PropTypes from 'prop-types';

const Input = ({secretWord}) => {
  return (
    <div data-testid="component-input"></div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input;
