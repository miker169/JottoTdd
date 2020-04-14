import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = ({guessedWords}) => {

  let contents;
  if(guessedWords.length === 0){
    contents = (
      <span data-testid="guess-instructions">
        Try to guess the secret word!
      </span>
    )
  }
  return (
    <div data-testid="component-guessed-words">
      {contents}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
}

export default GuessedWords;
