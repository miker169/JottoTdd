import React from "react";
import PropTypes from 'prop-types';

const Input = ({secretWord}) => {
  const [currentGuess, setCurrentGuess] = React.useState('');

  return (
    <div data-testid="component-input">
      <form className="form-inline">
        <input
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
          type="text"
          data-testid="input-box" className="mb-2 mx-sm-3" placeholder="enter guess" />
        <button
          data-testid="submit-button"
          className="btn btn-primary mb-2" >
          Submit
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input;
