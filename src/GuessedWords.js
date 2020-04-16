import React from 'react';

import languageContext from "./contexts/LanguageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

import stringsModule from "./helpers/strings";

const GuessedWords = () => {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWordsContext();

  let contents;
  if(guessedWords.length === 0){
    contents = (
      <span data-testid="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
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
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
          <tr>
            <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
            <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
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


export default GuessedWords;
