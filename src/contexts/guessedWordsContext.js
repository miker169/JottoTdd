import React from 'react';

const guessedWordsContext = React.createContext();


const useGuessedWordsContext = () => {
  const context = React.useContext(guessedWordsContext);

  if(!context){
    throw new Error('useGuessedWordsContext must be used within a GuessedWordsProvider');
  }

  return context;
}


const  GuessedWordsProvider = (props) => {
  const [guessedWords, setGuessWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessWords], [guessedWords]);

  return <guessedWordsContext.Provider value={value} {...props} />
}

export default { useGuessedWordsContext, GuessedWordsProvider}



