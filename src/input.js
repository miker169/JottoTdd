import React from "react";
import PropTypes from 'prop-types';
import LanguageContext from "./contexts/LanguageContext";
import stringsModule from "./helpers/strings";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import {getLetterMatchCount} from "./helpers";

const Input = ({secretWord}) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(LanguageContext);
  const [success, setSuccess]  = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWordsContext();

  debugger;

  if(success){ return null}

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
          const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
          const newGuessedWords = [...guessedWords, {guessedWord: currentGuess, letterMatchCount}];
          setGuessedWords(newGuessedWords);

          if(currentGuess === secretWord) {
            setSuccess(true);
          }
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
