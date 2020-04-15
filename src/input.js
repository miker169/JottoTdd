import React from "react";
import PropTypes from 'prop-types';
import LanguageContext from "./contexts/LanguageContext";
import stringsModule from "./helpers/strings";

const Input = ({secretWord}) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(LanguageContext);

  return (
    <div data-testid="component-input">
      <form className="form-inline">
        <input
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
          type="text"
          data-testid="input-box" className="mb-2 mx-sm-3"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')} />
        <button
          data-testid="submit-button"
        onClick={(evt) => {
          evt.preventDefault();
          // ToDO: upd§ate guessedWords
          // ToDo: check against secretWord and update success if needed
            setCurrentGuess('')
          }}
          className="btn btn-primary mb-2" >
          {stringsModule.getStringByLanguage(language, 'submit' )}
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input;
