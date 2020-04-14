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
  }else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-testid="guessed-word" key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ))
    contents = (
      <div data-testid="guessed-words">
        <h3>Guessed Words</h3>
        <table className="table table-sm">
          <thead className="thead-light">
          <tr>
            <th>Guess</th><th>Matching Letters</th>
          </tr>
          </thead>
          <tbody>
          { guessedWordsRows}
          </tbody>
        </table>
      </div>
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
