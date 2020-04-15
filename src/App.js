import React, { Component } from 'react';
//import './App.css';

import { SetSecretWordReducer } from "./reducers";
import GuessedWords from "./GuessedWords";
import Congrats from "./congrats";
import Input from './input';
import hookActions from "./actions/hookActions";

function App() {
  const [state, dispatch] = React.useReducer(
    SetSecretWordReducer,
    { secretWord: null})

  const setSecretWord = (secretWord) => dispatch({type: 'setSecretWord', payload: secretWord});

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
      <Input secretWord={state.secretWord}/>
    </div>
  )
}

export default App;
