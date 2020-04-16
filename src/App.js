import React, { Component } from 'react';

import hookActions from "./actions/hookActions";
import { SetSecretWordReducer } from "./reducers";

import GuessedWords from "./GuessedWords";
import Congrats from "./congrats";
import Input from './input';

import LanguagePicker from "./LanguagePicker";

import languageContext from './contexts/LanguageContext';
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

function App() {
  const [state, dispatch] = React.useReducer(
    SetSecretWordReducer,
    { secretWord: null ,  language: 'en'})

  const setSecretWord = (secretWord) =>
    dispatch({type: 'setSecretWord', payload: secretWord});

  const setLanguage = (language) =>
    dispatch({type: 'setLanguage', payload: language});

  React.useEffect(
    () => {hookActions.getSecretWord(setSecretWord)},
    []
  );

  if(!state.secretWord){
    return (
      <div className="container" data-testid="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    )
  }
  return (
    <div className="container" data-testid="component-app">
      <h1>Jotto</h1>
      <p>The secret word is {state.secretWord}</p>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord}/>
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  )
}

export default App;
