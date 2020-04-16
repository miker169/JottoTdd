import React from 'react';
import { render } from '@testing-library/react';

import GuessedWords from "./GuessedWords";

import guessedWordsContext from "./contexts/guessedWordsContext";

describe('<GuessedWords/>', () => {

  // const defaultProps = {
  //  guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
  // };

  const setup = (guessedWords) => {
    const mockUseGuessedWords = jest.fn().mockReturnValue(
      [guessedWords], jest.fn()
    );
    guessedWordsContext.useGuessedWordsContext = mockUseGuessedWords;
    return render(<GuessedWords />);
  }

  describe('if there are no words guessed', () => {
    let queryByTestId;
    beforeEach(() => {
      ({queryByTestId} = setup([]));
    });
    test('renders without error', () => {
      const component = queryByTestId('component-guessed-words');
      expect(component).toBeTruthy()
    })

    test('renders instructions to guess a word', () => {
      const instructions = queryByTestId('guess-instructions');
      expect(instructions.textContent.length).not.toBe(0)
    });
  });

  describe('if there are words guessed', () => {
    const guessedWords = [
      {guessedWord: 'train', letterMatchCount: 3},
      {guessedWord: 'agile', letterMatchCount: 1},
      {guessedWord: 'party', letterMatchCount: 5},
    ]
    let queryByTestId;

    beforeEach(() => {
      ({queryByTestId} = setup(guessedWords));
    });
    test('renders without error', () => {
      const component = queryByTestId('component-guessed-words');
      expect(component).toBeTruthy();
    });
    test('renders guessed words section', () => {
      const guessedWordsNode = queryByTestId('guessed-words');
      expect(guessedWordsNode).toBeTruthy();
    });
    test('correct number of guessed words',  () => {
      const guessedWords = queryByTestId('guessed-words');
      expect(guessedWords.length).toBe(guessedWords.length);
    });
  });

  describe('language picker', ()=> {
    test('correctly renders guess instructions in english', ()=> {
      const {queryByTestId} = setup([]);
      const guessInstructions = queryByTestId('guess-instructions');
      expect(guessInstructions.textContent).toBe('Try to guess the secret word!');
    });
    test('correctly renders guess instructions string in emoji' , () => {
      const mockUseContext = jest.fn().mockReturnValue('emoji');
      React.useContext = mockUseContext;
      const {queryByTestId} = setup([]);
      const guessInstructions = queryByTestId('guess-instructions');
      expect(guessInstructions.textContent).toBe('🤔🤫🔤');
    });
  });
});
